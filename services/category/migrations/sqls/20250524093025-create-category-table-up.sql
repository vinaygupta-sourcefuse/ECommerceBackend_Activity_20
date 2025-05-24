CREATE TABLE IF NOT EXISTS public.category
(
    id SERIAL PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    imageurl text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default"
);

ALTER TABLE IF EXISTS public.category
    OWNER TO postgres;

    INSERT INTO public.category (name, imageurl, description) VALUES
    ('Camera', 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg', 'High-quality cameras for photography enthusiasts'),
    ('Watches', 'https://titanworld.com/cdn/shop/files/2648WM04_1_acea2af1-a8c4-4d06-83a3-b43381097683.jpg?v=1730812321&width=2000', 'Best Collection of Watches'),
    ('4K Ultra HD Monitor', 'https://imgs.search.brave.com/xWLhj2WZWRvM91Lgxl9Ww9o9QbsZaxtV2GVd2GUtAMg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFGR3EzQWFVYUwu/anBn', 'Crisp 27-inch 4K display with vibrant colors for professionals and gamers.'),
    ('Shoes', 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg', 'Comfortable and stylish footwear for all occasions'),
    ('Laptops', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbL8C33zOfkzuHbM-ZOmD0ZaZg_vbQ8ID6FQ&s', 'portable computers'),
    ('Mobiles', 'https://s.alicdn.com/@sc04/kf/H0990c57991cc4116ba08de9b4934053dO.jpg_720x720q50.jpg', 'Some of the best mobile phones available in the market'),
    ('Tablets', 'https://hips.hearstapps.com/hmg-prod/images/apple-ipad-mini-2024-review-lead-672a0d53e55b6.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=640:*', 'Portable touchscreen devices for work and play'),
    ('Headphones', 'https://shop.zebronics.com/cdn/shop/files/Zeb-Blast-Z-pic1.jpg?v=1708946658', 'High-quality audio accessories for music lovers'),
    ('Smart TVs', 'https://dianora.in/wp-content/uploads/2023/02/65-webos-4k-smart-tv-1.png', 'Televisions with internet connectivity and smart features'),
    ('Drones', 'https://www.sify.com/wp-content/uploads/2023/10/drone_flickr_1200.jpg', 'Unmanned aerial vehicles for photography and recreational use'),
    ('Virtual Reality Headsets', 'https://m.media-amazon.com/images/I/61RgUtmRymL.jpg', 'Devices that provide immersive virtual experiences'),
    ('Projectors', 'https://avstore.in/cdn/shop/products/AVStore-Epson-EH-TW-5820-Hero.jpg?v=1636360796', 'Devices for projecting images and videos onto a screen or wall');