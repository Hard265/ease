const plugin = require("tailwindcss");

module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            [
                "react-native-iconify/babel",
                {
                    icons: [
                        "hugeicons:shuffle",
                        "hugeicons:previous",
                        "hugeicons:play-circle",
                        "hugeicons:play",
                        "hugeicons:next",
                        "hugeicons:pause",
                        "hugeicons:repeat-off",
                        "hugeicons:repeat",
                        "hugeicons:repeat-one-01",
                        "heroicons:queue-list",
                        "hugeicons:add-circle",
                        "hugeicons:notebook-02"
                    ],
                },
            ],
        ],
    };
};
