<script>
    // @ts-ignore
    const getTheme = ({ localStorageTheme, systemSettingDark }) => {
        if (localStorageTheme !== null) return localStorageTheme;
        if (systemSettingDark.matches) return dark;
        return light;
    };
    // @ts-ignore
    const update = (theme) => {
        value = theme === dark ? "🌞" : "🌚";
        document.querySelector("html")?.setAttribute("data-theme", theme);
    };
    const handleClick = () => {
        // @ts-ignore
        const newTheme = currentThemeSetting === dark ? light : dark;
        localStorage.setItem("theme", newTheme);
        update(newTheme);
        currentThemeSetting = newTheme;
    };
    const light = "light";
    const dark = "dark";
    let localStorageTheme;
    let systemSettingDark;
    // @ts-ignore
    let currentThemeSetting;
    let value = $state("🌞");
    export function onMount() {
        localStorageTheme = localStorage.getItem("theme");
        systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
        currentThemeSetting = getTheme({
            localStorageTheme,
            systemSettingDark,
        });
        update(currentThemeSetting);
    }
</script>

<input
    type="button"
    data-theme-toggle
    aria-label={value === "🌚"
        ? "Change to dark theme."
        : "Change to light theme."}
    {value}
    onclick={handleClick}
/>
