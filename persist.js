let fetch = require('node-fetch')

const messagesData = [{
    "_id": {
        "oid": "612cb91b37b7f846030c364e"
    },
    "header": "First Message",
    "message": "Hello :)",
    "user": {
        "cart": [
            {
                "_id": {
                    "oid": "611503b38f26dc17d06fa090"
                },
                "name": "Mattise",
                "price": 22,
                "image_path": "/gallery/new/IMG_0530.png",
                "__v": 0
            },
            {
                "_id": {
                    "oid": "6128ba875b897c3a416ea53d"
                },
                "name": "free",
                "price": 20,
                "image_path": "/gallery/free.png",
                "__v": 0
            }
        ],
        "purchases": [
            [
                {
                    "_id": {
                        "oid": "611503b38f26dc17d06fa090"
                    },
                    "name": "Mattise",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0530.png",
                    "__v": 0
                },
                {
                    "_id": {
                        "oid": "611d0087b76aeb21f16dfc30"
                    },
                    "name": "trust-textual-design",
                    "price": 10,
                    "image_path": "/gallery/trust.png",
                    "__v": 0
                }
            ],
            [
                {
                    "_id": {
                        "oid": "611503b38f26dc17d06fa090"
                    },
                    "name": "Mattise",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0530.png",
                    "__v": 0
                }
            ],
            [
                {
                    "_id": {
                        "oid": "611563821485f3196eafcd22"
                    },
                    "name": "Julius",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0529.png",
                    "__v": 0
                }
            ]
        ],
        "loginActivity": [
            "16/8/2021 @ 14:1:39",
            "16/8/2021 @ 23:53:27",
            "19/8/2021 @ 13:33:30",
            "21/8/2021 @ 14:32:53",
            "23/8/2021 @ 18:23:41",
            "23/8/2021 @ 23:25:33",
            "24/8/2021 @ 2:8:6",
            "29/8/2021 @ 0:20:42",
            "29/8/2021 @ 1:26:54",
            "29/8/2021 @ 1:43:2",
            "29/8/2021 @ 14:37:19",
            "29/8/2021 @ 18:39:52"
        ],
        "logoutActivity": [
            "16/8/2021 @ 23:46:53",
            "19/8/2021 @ 13:34:18",
            "23/8/2021 @ 23:17:24",
            "23/8/2021 @ 23:34:22",
            "29/8/2021 @ 0:13:28",
            "29/8/2021 @ 1:25:44",
            "29/8/2021 @ 1:42:22",
            "29/8/2021 @ 14:14:41",
            "29/8/2021 @ 18:36:23"
        ],
        "_id": {
            "oid": "611a458c61429b20e6fd54aa"
        },
        "username": "admin",
        "email": "admin@artbyme.com",
        "password": "$2a$12$eTxyDRT8lvj2HVG7eu.1GO9f5DyQlq0nhovsyIZ89RW5Gu52GNtJG",
        "__v": 87
    },
    "sent_at": "30/8/2021 @ 13:55:23",
    "__v": 0
},{
    "_id": {
        "oid": "612cbb7274daaa463ebb14e2"
    },
    "header": "Second Message",
    "message": "for testing",
    "user": {
        "cart": [
            {
                "_id": {
                    "oid": "61159a62a5050f1b66c2496c"
                },
                "name": "She",
                "price": 22,
                "image_path": "/gallery/new/Untitled_Artwork 7.png",
                "__v": 0
            }
        ],
        "purchases": [
            [
                {
                    "_id": {
                        "oid": "61156135e43c5f193a5029b8"
                    },
                    "name": "Friends-themed-card",
                    "price": 22,
                    "image_path": "/gallery/new/Untitled_Artwork 9.png",
                    "__v": 0
                }
            ],
            [
                {
                    "_id": {
                        "oid": "611563821485f3196eafcd22"
                    },
                    "name": "Julius",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0529.png",
                    "__v": 0
                },
                {
                    "_id": {
                        "oid": "611503b38f26dc17d06fa090"
                    },
                    "name": "Mattise",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0530.png",
                    "__v": 0
                }
            ],
            [
                {
                    "_id": {
                        "oid": "611590dba945891a5c9dfb43"
                    },
                    "name": "Friends",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0466.png",
                    "__v": 0
                }
            ],
            [
                {
                    "_id": {
                        "oid": "611563821485f3196eafcd22"
                    },
                    "name": "Julius",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0529.png",
                    "__v": 0
                }
            ],
            [
                {
                    "_id": {
                        "oid": "611683800673f91df0bf3536"
                    },
                    "name": "Feminine",
                    "price": 22,
                    "image_path": "/gallery/new/Untitled_Artwork 14.png",
                    "__v": 0
                },
                {
                    "_id": {
                        "oid": "61159c08eabcef1b833be288"
                    },
                    "name": "Self-care",
                    "price": 22,
                    "image_path": "/gallery/Untitled_Artwork 6.png",
                    "__v": 0
                },
                {
                    "_id": {
                        "oid": "611563a51485f3196eafcd2b"
                    },
                    "name": "Song-cover",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0520.png",
                    "__v": 0
                }
            ],
            [
                {
                    "_id": {
                        "oid": "611688e9d0746d1e49cde486"
                    },
                    "name": "trust-t-shirt-white",
                    "price": 35,
                    "image_path": "/gallery/tshirt3.png",
                    "__v": 0
                },
                {
                    "_id": {
                        "oid": "611688eed0746d1e49cde48c"
                    },
                    "name": "trust-t-shirt-brown",
                    "price": 35,
                    "image_path": "/gallery/tshirt2.png",
                    "__v": 0
                }
            ]
        ],
        "loginActivity": [
            "13/8/2021 @ 14:59:35",
            "13/8/2021 @ 17:36:31",
            "29/8/2021 @ 14:15:16",
            "30/8/2021 @ 14:5:4"
        ],
        "logoutActivity": [
            "13/8/2021 @ 17:36:20",
            "16/8/2021 @ 14:1:20",
            "29/8/2021 @ 14:37:5"
        ],
        "_id": {
            "oid": "61165e973250181d66e21a42"
        },
        "username": "Danielle",
        "email": "Danielle@artbyme.com",
        "password": "$2a$12$Evr6z9sikMhortzEiVFHuulgQF4Mu7JycCP5Y3.3jP2zrcfa7B3kK",
        "__v": 26
    },
    "sent_at": "30/8/2021 @ 14:5:22",
    "__v": 0
}]

const personalProductData = [{
        "_id": {
            "oid": "612a70705224c83f86afe481"
        },
        "name": "Pick-Color-Him",
        "price": 15,
        "image_path": "/gallery/pickColor/Untitled_Artwork 18.png",
        "image_background": "#ffffff",
        "__v": 0
    },{
        "_id": {
            "oid": "612bacd47bc14b42e0476591"
        },
        "name": "Pick-Color-Him-Bright",
        "price": 15,
        "image_path": "/gallery/pickColor/Untitled_Artwork 19.png",
        "image_background": "#ffffff",
        "__v": 0
    },{
        "_id": {
            "oid": "612baef97bc14b42e04765a5"
        },
        "name": "Pick-Color-Mattise",
        "price": 15,
        "image_path": "/gallery/pickColor/Untitled_Artwork 23.png",
        "image_background": "#ffffff",
        "__v": 0
    },{
        "_id": {
            "oid": "612baf087bc14b42e04765a8"
        },
        "name": "Pick-Color-Duo-Bright",
        "price": 15,
        "image_path": "/gallery/pickColor/Untitled_Artwork 20.png",
        "image_background": "#ffffff",
        "__v": 0
    },{
        "_id": {
            "oid": "612baf0b7bc14b42e04765ab"
        },
        "name": "Pick-Color-Her",
        "price": 15,
        "image_path": "/gallery/pickColor/Untitled_Artwork 22.png",
        "image_background": "#ffffff",
        "__v": 0
    },{
        "_id": {
            "oid": "612baf0c7bc14b42e04765ae"
        },
        "name": "Pick-Color-Secret",
        "price": 15,
        "image_path": "/gallery/pickColor/Untitled_Artwork 21.png",
        "image_background": "#ffffff",
        "__v": 0
    },{
        "_id": {
            "oid": "612cff6c3a90dc4857c5528f"
        },
        "name": "Image-To-Art",
        "price": 20,
        "image_path": "//",
        "image_background": "#ffffff",
        "__v": 0
    }]

const productsData = [{
    "_id": {
        "oid": "611503b38f26dc17d06fa090"
    },
    "name": "Mattise",
    "price": 22,
    "image_path": "/gallery/new/IMG_0530.png",
    "__v": 0
},{
    "_id": {
        "oid": "61156135e43c5f193a5029b8"
    },
    "name": "Friends-themed-card",
    "price": 22,
    "image_path": "/gallery/new/Untitled_Artwork 9.png",
    "__v": 0
},{
    "_id": {
        "oid": "611563821485f3196eafcd22"
    },
    "name": "Julius",
    "price": 22,
    "image_path": "/gallery/new/IMG_0529.png",
    "__v": 0
},{
    "_id": {
        "oid": "611563a51485f3196eafcd2b"
    },
    "name": "Song-cover",
    "price": 22,
    "image_path": "/gallery/new/IMG_0520.png",
    "__v": 0
},{
    "_id": {
        "oid": "611590dba945891a5c9dfb43"
    },
    "name": "Friends",
    "price": 22,
    "image_path": "/gallery/new/IMG_0466.png",
    "__v": 0
},{
    "_id": {
        "oid": "61159a62a5050f1b66c2496c"
    },
    "name": "She",
    "price": 22,
    "image_path": "/gallery/new/Untitled_Artwork 7.png",
    "__v": 0
},{
    "_id": {
        "oid": "61159c08eabcef1b833be288"
    },
    "name": "Self-care",
    "price": 22,
    "image_path": "/gallery/Untitled_Artwork 6.png",
    "__v": 0
},{
    "_id": {
        "oid": "6116534336fd761c6e9043c4"
    },
    "name": "Her",
    "price": 22,
    "image_path": "/gallery/new/Untitled_Artwork 15.png",
    "__v": 0
},{
    "_id": {
        "oid": "611683800673f91df0bf3536"
    },
    "name": "Feminine",
    "price": 22,
    "image_path": "/gallery/new/Untitled_Artwork 14.png",
    "__v": 0
},{
    "_id": {
        "oid": "611688e9d0746d1e49cde486"
    },
    "name": "trust-t-shirt-white",
    "price": 35,
    "image_path": "/gallery/tshirt3.png",
    "__v": 0
},{
    "_id": {
        "oid": "611688eed0746d1e49cde48c"
    },
    "name": "trust-t-shirt-brown",
    "price": 35,
    "image_path": "/gallery/tshirt2.png",
    "__v": 0
},{
    "_id": {
        "oid": "611d0087b76aeb21f16dfc30"
    },
    "name": "trust-textual-design",
    "price": 10,
    "image_path": "/gallery/trust.png",
    "__v": 0
},{
    "_id": {
        "oid": "6128ba7c5b897c3a416ea531"
    },
    "name": "bright-duo",
    "price": 22,
    "image_path": "/gallery/brightduo.png",
    "__v": 0
},{
    "_id": {
        "oid": "6128ba815b897c3a416ea537"
    },
    "name": "nike",
    "price": 22,
    "image_path": "/gallery/nike.png",
    "__v": 0
},{
    "_id": {
        "oid": "6128ba875b897c3a416ea53d"
    },
    "name": "free",
    "price": 20,
    "image_path": "/gallery/free.png",
    "__v": 0
},{
    "_id": {
        "oid": "6128ba8b5b897c3a416ea543"
    },
    "name": "dark-duo",
    "price": 22,
    "image_path": "/gallery/darkduo.png",
    "__v": 0
},{
    "_id": {
        "oid": "6128ba8f5b897c3a416ea549"
    },
    "name": "baby-card",
    "price": 25,
    "image_path": "/gallery/babycard.png",
    "__v": 0
},{
    "_id": {
        "oid": "6128ba965b897c3a416ea54f"
    },
    "name": "trust-t-shirt-beige",
    "price": 35,
    "image_path": "/gallery/tshirt1.png",
    "__v": 0
}]

const usersData = [{
    "_id": {
        "$oid": "612cc102b2f32946745c9831"
    },
    "cart": [
        {
            "_id": {
                "oid": "612baf0b7bc14b42e04765ab"
            },
            "name": "Pick-Color-Her",
            "price": 15,
            "image_path": "/gallery/pickColor/Untitled_Artwork 22.png",
            "image_background": "ece4e8",
            "__v": 0
        },
        {
            "_id": {
                "oid": "61159c08eabcef1b833be288"
            },
            "name": "Self-care",
            "price": 22,
            "image_path": "/gallery/Untitled_Artwork 6.png",
            "__v": 0
        }
    ],
    "purchases": [
        {
            "purchased_at": "30/8/2021 @ 14:29:55",
            "items": [
                {
                    "_id": {
                        "oid": "612baf0b7bc14b42e04765ab"
                    },
                    "name": "Pick-Color-Her",
                    "price": 15,
                    "image_path": "/gallery/pickColor/Untitled_Artwork 22.png",
                    "image_background": "f5ebef",
                    "__v": 0
                },
                {
                    "_id": {
                        "oid": "611503b38f26dc17d06fa090"
                    },
                    "name": "Mattise",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0530.png",
                    "__v": 0
                }
            ]
        },
        {
            "purchased_at": "30/8/2021 @ 14:41:29",
            "items": [
                {
                    "_id": {
                        "oid": "61159c08eabcef1b833be288"
                    },
                    "name": "Self-care",
                    "price": 22,
                    "image_path": "/gallery/Untitled_Artwork 6.png",
                    "__v": 0
                },
                {
                    "_id": {
                        "oid": "611590dba945891a5c9dfb43"
                    },
                    "name": "Friends",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0466.png",
                    "__v": 0
                },
                {
                    "_id": {
                        "oid": "611688e9d0746d1e49cde486"
                    },
                    "name": "trust-t-shirt-white",
                    "price": 35,
                    "image_path": "/gallery/tshirt3.png",
                    "__v": 0
                }
            ]
        },
        {
            "purchased_at": "30/8/2021 @ 20:35:15",
            "items": [
                {
                    "_id": {
                        "oid": "611503b38f26dc17d06fa090"
                    },
                    "name": "Mattise",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0530.png",
                    "__v": 0
                },
                {
                    "_id": {
                        "oid": "612a70705224c83f86afe481"
                    },
                    "name": "Pick-Color-Him",
                    "price": 15,
                    "image_path": "/gallery/pickColor/Untitled_Artwork 18.png",
                    "image_background": "ffdbdb",
                    "__v": 0
                },
                {
                    "_id": {
                        "oid": "612cff6c3a90dc4857c5528f"
                    },
                    "name": "Image-To-Art: IMG_0484.PNG",
                    "price": 20,
                    "image_path": "/gallery/personal.png",
                    "image_background": "#ffffff",
                    "__v": 0
                }
            ]
        },
        {
            "purchased_at": "30/8/2021 @ 20:39:15",
            "items": [
                {
                    "_id": {
                        "oid": "612baf0c7bc14b42e04765ae"
                    },
                    "name": "Pick-Color-Secret",
                    "price": 15,
                    "image_path": "/gallery/pickColor/Untitled_Artwork 21.png",
                    "image_background": "f7f4f3",
                    "__v": 0
                }
            ]
        },
        {
            "purchased_at": "30/8/2021 @ 21:19:23",
            "items": [
                {
                    "_id": {
                        "oid": "611563821485f3196eafcd22"
                    },
                    "name": "Julius",
                    "price": 22,
                    "image_path": "/gallery/new/IMG_0529.png",
                    "__v": 0
                }
            ]
        }
    ],
    "loginActivity": [
        "30/8/2021 @ 14:29:19"
    ],
    "logoutActivity": [],
    "username": "admin",
    "email": "admin@artbyme.com",
    "password": "$2a$12$mj6pzTKfzfdV4cW596RD1uFfRA1muo1azSBzfjwtenxOYAjuLY.cS",
    "__v": 50
}]

function getMessagesData() {
    return messagesData
}

function getPersonalProductsData() {
    return personalProductData
}

function getProductsData() {
    return productsData
}

// function getUsersData() {
//     return usersData
// }

async function getUsersData() {
    let response = await fetch('http://localhost:7707/register/admin/admin', {
        method: 'post'
    })
}


module.exports = {
    getMessagesData: getMessagesData(),
    getPersonalProductsData: getPersonalProductsData(),
    getProductsData: getProductsData(),
    getUsersData: getUsersData()
}
