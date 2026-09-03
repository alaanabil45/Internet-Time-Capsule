import music2009 from "../music/2009";
import movies2009 from "../movies/2009";
import memories2009 from "../memories/2009";
import tech2009 from "../tech/2009";

export const year2009 = {
    year: 2009,

    music: music2009,
    movies: movies2009,
    memories: memories2009,
    tech: tech2009,

    meta: {
        title: "THE AERO ERA",
        description:
            "Everything looked faster, shinier, and somehow more futuristic.",
    },

    desktop: {
        wallpaper: "/wallpaper/2009.jpg",

        theme: {
            mode: "aero",
            accent: "#6fb7e8",
            window: "aero",
            taskbar: "glass",
            desktopText: "light",
        },

        icons: [
            {
                id: "tech",
                label: "Technology",
                image: "/icons/2009/computer.png",
            },

            {
                id: "internet",
                label: "Internet",
                image: "/icons/2009/internet.ico",
            },

            {
                id: "music",
                label: "Music",
                image: "/icons/2009/music.png",
            },

            {
                id: "memories",
                label: "Memories",
                image: "/icons/2009/Documents.ico",
            },

            {
                id: "movies",
                label: "Movies",
                image: "/icons/2009/videos.png",
            },

        ],
    },

    mobile: {
        wallpaper: "/wallpaper/2009ph.jpg",

        theme: {
            mode: "aero",
            accent: "#6fb7e8",
            window: "aero",
            taskbar: "glass",
            desktopText: "light",
        },

        icons: [
            {
                id: "tech",
                label: "Technology",
                image: "/icons/2009/phtech.jpg",
            },

            {
                id: "internet",
                label: "Internet",
                image: "/icons/2009/internet.png",
            },

            {
                id: "music",
                label: "Music",
                image: "/icons/2009/phmusic.png",
            },

            {
                id: "memories",
                label: "Memories",
                image: "/icons/2009/phmemories.jpg",
            },

            {
                id: "movies",
                label: "Movies",
                image: "/icons/2009/phvedios.jpg",
            },

        ],
    },

    internet: [],

};