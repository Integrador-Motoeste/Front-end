import { Slot } from "expo-router"
import  Menu  from "@/components/Menu"

export default function LayoutPublic(){

    return (
        <>
        <Slot/>
        <Menu/>
        </>
    )

}