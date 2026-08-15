import { Table } from "./table";

interface ParticipantListProps {
    participants: {
        vorname: string;
        nachname: string;
    }[];
};

export default function ParticipantList({ participants }: ParticipantListProps) {
    return (
        <Table variant="list" heading={`Teilnehmer (${participants.length})`}>
            {participants.map(({ vorname, nachname }, index) => (
                <Table.Row key={index} value={`${vorname} ${nachname}`} />
            ))}
        </Table>
    );
};