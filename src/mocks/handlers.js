import { rest } from 'msw';

export const handlers = [
    rest.get('https://peticiones.online/api/series', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    "id": 5,
                    "title": "Juego de Tronos",
                    "creator": "David Benioff, D.B. Weiss",
                    "rating": 9.2,
                    "dates": "2011-2019",
                    "image": "https://es.web.img3.acsta.net/pictures/19/03/22/10/08/5883111.jpg",
                    "channel": "HBO"
                }
            ])
        )
    }),
    rest.post('https://peticiones.online/api/series', (req, res, ctx) => {
        return res(
            ctx.json({ success: true })
        );
    })
]
