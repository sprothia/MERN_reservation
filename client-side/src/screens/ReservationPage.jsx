import { useParams } from "react-router"

export default function ReservationPage() {
    const {id} = useParams()

    return (
        <div>One booking {id}</div>
    )
}