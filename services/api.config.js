export default async function api(id) {
    const response = await fetch({
        url: `http://localhost:3333/clients/${id}`
    });
    return await response.json();
}
   