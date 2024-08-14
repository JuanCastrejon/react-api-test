import { rest } from 'msw';

let series = [
    {
        "id": 5,
        "title": "Juego de Tronos",
        "creator": "David Benioff, D.B. Weiss",
        "rating": 9.2,
        "dates": "2011-2019",
        "image": "https://es.web.img3.acsta.net/pictures/19/03/22/10/08/5883111.jpg",
        "channel": "HBO"
    }
    // Otras series...
];

export const handlers = [
    rest.get('https://peticiones.online/api/series', (req, res, ctx) => {
        return res(
            ctx.json(series)
        );
    }),
    rest.post('https://peticiones.online/api/series', (req, res, ctx) => {
        const newSerie = { id: series.length + 1, ...req.body };
        series.push(newSerie);
        return res(
            ctx.json({ success: true })
        );
    }),
    rest.put('https://peticiones.online/api/series/:id', (req, res, ctx) => {
        const { id } = req.params;
        const serieIndex = series.findIndex(serie => serie.id === parseInt(id));

        if (serieIndex !== -1) {
            series[serieIndex] = { ...series[serieIndex], ...req.body };
            return res(
                ctx.json(series[serieIndex])
            );
        } else {
            return res(
                ctx.status(404),
                ctx.json({ error: "La serie que intentas editar no existe" })
            );
        }
    }),
    rest.delete('https://peticiones.online/api/series/:id', (req, res, ctx) => {
        const { id } = req.params;
        const serieIndex = series.findIndex(serie => serie.id === parseInt(id));

        if (serieIndex !== -1) {
            const deletedSerie = series.splice(serieIndex, 1)[0];
            return res(
                ctx.status(200),
                ctx.json(deletedSerie)
            );
        } else {
            return res(
                ctx.status(404),
                ctx.json({ error: "La serie que intentas borrar no existe" })
            );
        }
    })
];