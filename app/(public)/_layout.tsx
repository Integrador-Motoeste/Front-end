import { Slot } from "expo-router"
import  Menu  from "@/components/Menu"
import { Stack } from 'expo-router/stack'

export default function LayoutPublic(){

    return (
        <>
        <Slot/>
        <Menu/>
        </>
    )

}