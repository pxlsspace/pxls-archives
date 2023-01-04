export async function load() {
    return {
        version: process.env.npm_package_version
    };
}

export const prerender = true;
