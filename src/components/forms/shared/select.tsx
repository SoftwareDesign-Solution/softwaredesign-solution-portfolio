'use client'

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

export interface SelectOption<TValue extends string = string> {
  value: TValue
  label: string
  disabled?: boolean
}

/**
 * Props for {@link Select}.
 *
 * Fully controlled: `value`/`onChange` own the selection, so it drops
 * straight into `react-hook-form` (see `SelectField`) or plain
 * `useState`. `error` switches the button outline to the `error-*`
 * tokens so it lines up with the existing Zod validation styling.
 */
export interface SelectProps<TValue extends string = string> {
  options: SelectOption<TValue>[]
  value: TValue | null
  onChange: (value: TValue) => void
  onBlur?: () => void
  label?: string
  placeholder?: string
  id?: string
  name?: string
  disabled?: boolean
  error?: boolean
  className?: string
}

/**
 * Tailwind-only Ersatz für das native `<select>`, nachgebaut nach dem
 * Headless-UI-`Listbox`-Muster (Tailwind Plus "Select"-Beispiel) – ohne
 * `@headlessui/react` oder `@heroicons/react` als Abhängigkeit. Deckt
 * das ARIA "Collapsible Dropdown Listbox"-Pattern ab: Maus, Tastatur
 * (Pfeile, Home/End, Enter/Space, Escape, Type-ahead) und Klick
 * außerhalb schließt.
 */
export function Select<TValue extends string = string>({
  options,
  value,
  onChange,
  onBlur,
  label,
  placeholder = 'Bitte wählen',
  id,
  name,
  disabled = false,
  error = false,
  className = '',
}: SelectProps<TValue>) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const typeaheadRef = useRef<{
    buffer: string
    timeout: ReturnType<typeof setTimeout> | undefined
  }>({ buffer: '', timeout: undefined })

  const generatedId = useId()
  const buttonId = id ?? `select-${generatedId}`
  const listboxId = `${buttonId}-listbox`

  const selected = options.find((option) => option.value === value) ?? null
  const selectableIndexes = options
    .map((option, index) => (option.disabled ? -1 : index))
    .filter((index) => index !== -1)

  const close = useCallback(() => {
    setOpen(false)
    onBlur?.()
  }, [onBlur])

  // Klick außerhalb schließt das Dropdown
  useEffect(() => {
    if (!open) return
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        close()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open, close])

  // Beim Öffnen: aktuell gewählte Option (oder erste wählbare) hervorheben + Fokus in die Liste
  useEffect(() => {
    if (!open) return
    const selectedIndex = options.findIndex((option) => option.value === value)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(selectedIndex !== -1 ? selectedIndex : (selectableIndexes[0] ?? 0))
    listRef.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) return
    const node = listRef.current?.children[activeIndex] as HTMLElement | undefined
    node?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIndex])

  function moveActive(delta: 1 | -1) {
    if (selectableIndexes.length === 0) return
    const currentPosition = selectableIndexes.indexOf(activeIndex)
    const nextPosition =
      currentPosition === -1
        ? delta === 1
          ? 0
          : selectableIndexes.length - 1
        : (currentPosition + delta + selectableIndexes.length) % selectableIndexes.length
    setActiveIndex(selectableIndexes[nextPosition])
  }

  function selectActive() {
    const option = options[activeIndex]
    if (!option || option.disabled) return
    onChange(option.value)
    setOpen(false)
    buttonRef.current?.focus()
  }

  function handleTypeahead(char: string) {
    const state = typeaheadRef.current
    clearTimeout(state.timeout)
    state.buffer += char.toLowerCase()
    state.timeout = setTimeout(() => {
      state.buffer = ''
    }, 500)

    const startAt = (activeIndex + 1) % options.length
    const ordered = [...options.slice(startAt), ...options.slice(0, startAt)]
    const match = ordered.find(
      (option) => !option.disabled && option.label.toLowerCase().startsWith(state.buffer),
    )
    if (match) setActiveIndex(options.indexOf(match))
  }

  function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case ' ':
        event.preventDefault()
        setOpen(true)
        break
      default:
        if (event.key.length === 1) {
          setOpen(true)
          handleTypeahead(event.key)
        }
    }
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        moveActive(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        moveActive(-1)
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(selectableIndexes[0] ?? 0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(selectableIndexes[selectableIndexes.length - 1] ?? 0)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        selectActive()
        break
      case 'Escape':
        event.preventDefault()
        close()
        buttonRef.current?.focus()
        break
      case 'Tab':
        close()
        break
      default:
        if (event.key.length === 1) handleTypeahead(event.key)
    }
  }

  return (
    <div ref={rootRef} className={className}>
      {label && (
        <label htmlFor={buttonId} className="block text-sm/6 font-medium text-foreground">
          {label}
        </label>
      )}

      <div className={`relative ${label ? 'mt-2' : ''}`}>
        <button
          ref={buttonRef}
          type="button"
          id={buttonId}
          name={name}
          disabled={disabled}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          onClick={() => !disabled && setOpen((isOpen) => !isOpen)}
          onKeyDown={handleButtonKeyDown}
          className={[
            'grid w-full cursor-default grid-cols-1 rounded-md bg-white px-3 py-2.5 text-left text-foreground outline-1 -outline-offset-1 sm:text-sm/6',
            error
              ? 'outline-error-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-error-600'
              : 'outline-border focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-700',
            disabled ? 'cursor-not-allowed opacity-60' : '',
          ].join(' ')}
        >
            {/** py-1.5 pr-2 pl-3*/}
          <span className={`col-start-1 row-start-1 truncate pr-6 ${selected ? '' : 'text-muted'}`}>
            {selected ? selected.label : placeholder}
          </span>
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-muted sm:size-4"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
            />
          </svg>
        </button>

        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={options[activeIndex] ? `${listboxId}-option-${activeIndex}` : undefined}
            onKeyDown={handleListKeyDown}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-sm outline-1 outline-black/5 sm:text-sm"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value
              const isActive = index === activeIndex
              return (
                <li
                  key={option.value}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                  onClick={() => {
                    if (option.disabled) return
                    onChange(option.value)
                    setOpen(false)
                    buttonRef.current?.focus()
                  }}
                  className={[
                    'relative cursor-default py-2 pr-9 pl-3 select-none',
                    option.disabled
                      ? 'cursor-not-allowed text-muted'
                      : isActive
                        ? 'bg-primary-700 text-white'
                        : 'text-foreground',
                  ].join(' ')}
                >
                  <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`}>
                    {option.label}
                  </span>
                  {/*isSelected && (
                    <span
                      className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                        isActive ? 'text-white' : 'text-primary-700'
                      }`}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        />
                      </svg>
                    </span>
                  )*/}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}