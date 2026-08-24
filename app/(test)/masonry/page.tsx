import MasonryClient from "./client"

export default function Page() {
    const photos = fetch("https://picsum.photos/v2/list?limit=100").then((res) => res.json())
    
    return (
        <MasonryClient photos={photos} />
    )
}