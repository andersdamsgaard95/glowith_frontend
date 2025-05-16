{/* Get Theme Color */}
export function getThemeColor (backgroundColor: string | undefined) {
    switch (backgroundColor) {
        case 'Theme Blue':
            return '#b2d7e4';
        case 'Theme Light Pink':
            return '#e9ccd2';
        case 'Theme Dark Pink':
            return '#e68f9e';
        case 'Theme Yellow':
            return '#f0eea4';
        case 'Theme Purple':
            return '#b5b6da';
        case 'Theme Green':
            return '#b1dab6';
        case 'Theme Black':
            return '#000000';
        case 'Theme White':
            return '#fafafa';
        case 'None':
            return 'transparent'
        default:
            return '#fafafa';
    }
}

export function getThemeStyles (backgroundColor: string) {
    switch (backgroundColor) {
        case 'Theme Blue':
            return {
                '--text-color': '#000000'
            } as React.CSSProperties;
        case 'Theme Light Pink':
            return {
                '--text-color': '#000000'
            } as React.CSSProperties;
        case 'Theme Dark Pink':
            return {
                '--text-color': '#000000'
            } as React.CSSProperties;
        case 'Theme Yellow':
            return {
                '--text-color': '#000000'
            } as React.CSSProperties;
        case 'Theme Purple':
            return {
                '--text-color': '#000000'
            } as React.CSSProperties;
        case 'Theme Green':
            return {
                '--text-color': '#000000'
            } as React.CSSProperties;
        case 'Theme Black':
            return {
                '--text-color': '#ffffff'
            } as React.CSSProperties;
        case 'Theme White':
            return {
                '--text-color': '#000000'
            } as React.CSSProperties;
        default:
            return {
                '--text-color': '#000000'
            } as React.CSSProperties;
    }
}

export function getBlockPadding (blockPadding: string) {
    switch (blockPadding) {
        case 'Default 50px':
            return '50px';
        case 'Small 25px':
            return '25px';
        case 'None':
            return '0';
        default:
            return '50px';
    }
}
