import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import config from "../config.json";

export default function ShowPokemon() {
    const { name } = useParams();





    return (
        <Layout>
            Pokemon: {name}



        </Layout>
    );
}