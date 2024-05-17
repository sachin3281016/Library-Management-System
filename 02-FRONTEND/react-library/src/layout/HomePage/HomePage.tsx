import { Carouusel } from "./components/Carousel"
import { ExploreTopBooks } from "./components/ExploreTopBooks"
import { Heros } from "./components/Heros"
import { LibraryServices } from "./components/LibraryServices"

export const HomePage =()=>{
    return <>
    <ExploreTopBooks />
    <Carouusel />
    <Heros />
    <LibraryServices />
    </>
}