
export async function post() {
    // If netlify posts to here then we know it was successful.
    return {
        headers: { Location: '/contact_success' },
        status: 302
    }
} 