import React from "react";
import { FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import SongsListItem from "components/SongsListItem";

const data = [
    {
        title: "nesciunt",
        artist: ["Milton Donnelly"],
        duration: 230,
    },
    {
        title: "quia",
        artist: ["Mr. Ethel Lubowitz"],
        duration: 230,
    },
    {
        title: "est",
        artist: ["Constance Kertzmann"],
        duration: 230,
    },
    {
        title: "illum",
        artist: ["Jacqueline Kuvalis"],
        duration: 230,
    },
];

export default observer(() => {
    return (
        <FlatList
            className="flex-1"
            data={data}
            renderItem={({ item, index }) => (
                <SongsListItem item={item} index={index} />
            )}
        />
    );
});
