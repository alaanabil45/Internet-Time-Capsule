import music2012 from "../music/2012";
import movies2012 from "../movies/2012";
import tech2012 from "../tech/2012";

export const year2012 = {
    year: 2012,

    music: music2012,
    movies: movies2012,
    tech: tech2012,

    desktop: {
        wallpaper: "/wallpaper/2012.png",

        theme: {
            mode: "dark",
            accent: "#8aa8b8",
            window: "dark-glass",
            taskbar: "dark",
            desktopText: "light",
        },

        icons: [
            {
                id: "internet",
                label: "Internet",
                image: "/icons/2012/internet.png",
            },

            {
                id: "music",
                label: "Music",
                image: "/icons/2012/musicc.png",
            },

            {
                id: "memories",
                label: "Memories",
                image: "/icons/2012/memories.png",
            },

            {
                id: "tech",
                label: "Tech",
                image: "/icons/2012/computer.png",
            },

            {
                id: "movies",
                label: "Movies",
                image: "/icons/2012/videos.png",
            },

        ],
    },

    mobile: {
        wallpaper: "/wallpaper/ph2012.jpg",

        theme: {
            mode: "dark",
            accent: "#8aa8b8",
            window: "dark-glass",
            taskbar: "dark",
            desktopText: "light",
        },

        icons: [
            {
                id: "tech",
                label: "Technology",
                image: "/icons/2012/phtech.jpg",
            },

            {
                id: "internet",
                label: "Internet",
                image: "/icons/2012/internet.png",
            },

            {
                id: "music",
                label: "Music",
                image: "/icons/2012/phmusic.jpg",
            },

            {
                id: "memories",
                label: "Memories",
                image: "/icons/2012/phmemories.jpg",
            },

            {
                id: "movies",
                label: "Movies",
                image: "/icons/2012/phvideos.jpg",
            },

        ],
    },

    meta: {
        title: "THE GOLDEN HOUR",
        description:
            "The internet was everywhere. But it still felt personal.",
    },

    internet: [
        {
            id: "youtube",
            name: "YouTube",
            icon: "/icons/2012/youtube.png",
            description:
                "A place where everyone seemed to be discovering the next big thing.",
            memory:
                "You waited for videos to buffer, then sent the link to everyone you knew.",
        },
        {
            id: "facebook",
            name: "Facebook",
            icon: "/icons/2012/facebook.webp",
            description:
                "The place where birthdays, relationships, photos and arguments lived.",
            memory:
                "Checking someone's profile could somehow take an entire evening.",
        },
        {
            id: "tumblr",
            name: "Tumblr",
            icon: "/icons/2012/tumblr.webp",
            description:
                "Quotes, GIFs, fandoms and an internet culture that felt completely its own.",
            memory:
                "You didn't just follow people. You followed entire moods.",
        },
        {
            id: "instagram",
            name: "Instagram",
            icon: "/icons/2012/instagram.png",
            description:
                "A tiny photo-sharing app that was about to become much bigger.",
            memory:
                "Photos looked imperfect, square and strangely personal.",
        },
        {
            id: "minecraft",
            name: "Minecraft",
            icon: "/icons/2012/minecraft.jpg",
            description:
                "A blocky world where millions of people were building their own.",
            memory:
                "You could spend hours building something nobody else would ever see.",
        },
    ],

    memories: [
        {
            id: 1,
            title: "THE OLD COMPUTER",
            image: "/memories/2012-computer.jpg",
            caption: "You knew every sound it made.",
            story:
                "You could hear the computer starting from the other room. Somehow, that sound meant the night was about to begin.",
            source:
                "https://commons.wikimedia.org/wiki/File:Macbook_2012.jpg",
            license: "CC BY 2.0",
            author: "Bruno Padilha",
        },

        {
            id: 2,
            title: "THE NEW PHONE",
            image: "/memories/2012-phone.jpg",
            caption: "It felt like carrying the future.",
            story:
                "A new phone could feel like a tiny piece of the future. You showed it to everyone, even when there was nothing new to show.",
            source:
                "https://commons.wikimedia.org/wiki/File:IPhone_5_Unboxing,_10-10-12.jpg",
            license: "CC BY 2.0",
            author: "Brett Jordan",
        },

        {
            id: 3,
            title: "ONE MORE PHOTO",
            image: "/memories/2012-camera.jpg",
            caption: "Take another one.",
            story:
                "Nobody knew which photos would matter years later. We just kept taking them.",
            source:
                "https://commons.wikimedia.org/wiki/File:Creative_camera.jpg",
            license: "CC BY-SA 3.0",
            author: "Uberprutser",
        },

        {
            id: 4,
            title: "THE PEOPLE",
            image: "/memories/2012-friends.jpg",
            caption: "Nobody knew this would become nostalgic.",
            story:
                "The ordinary days were the ones we never thought we'd miss.",
            source:
                "https://commons.wikimedia.org/wiki/File:Friends_.jpg",
            license: "CC BY 2.0",
            author: "Wikimedia Commons contributor",
        },

        {
            id: 5,
            title: "LATE NIGHT",
            image: "/memories/2012-night.jpg",
            caption: "Everyone was somewhere.",
            story:
                "There was always someone awake somewhere. A message, a song, a new photo. You never really felt alone.",
            source:
                "https://commons.wikimedia.org/wiki/File:Night_work.jpg",
            license: "",
            author: "",
        },
    ],


};