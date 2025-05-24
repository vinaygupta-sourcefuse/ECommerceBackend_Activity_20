/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.product
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    discount integer NOT NULL,
    images text COLLATE pg_catalog."default" NOT NULL,
    categoryid text COLLATE pg_catalog."default" NOT NULL,
    brandid text COLLATE pg_catalog."default" NOT NULL,
    stock integer NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product
    OWNER to postgres;




INSERT INTO product (id, name, description, price, discount, images, categoryid, brandid, stock) VALUES
('1', 'Camera', 'High-quality DSLR camera with advanced features.', 500, 0, '["https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg"]', '1', 'brand-001', 20),
('2', 'Camera Lens', 'Wide-angle lens for capturing stunning landscapes.', 300, 0, '["https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?cs=srgb&dl=pexels-pixabay-274973.jpg&fm=jpg"]', '1', 'brand-002', 15),
('3', 'Camera Tripod', 'Lightweight and durable tripod for stable shots.', 150, 0, '["https://i.natgeofe.com/n/cae95353-dd17-41f9-85f3-9699745e7ce9/MM10326_20241009_0001.jpg"]', '1', 'brand-003', 25),
('watch-4', 'Smart Watch', 'Feature-packed smartwatch with fitness tracking.', 200, 15, '["https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-pixabay-190819.jpg&fm=jpg"]', '2', 'brand-smarttech', 20),
('watch-5', 'Analog Watch', 'Classic analog watch with leather strap.', 100, 5, '["https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?cs=srgb&dl=pexels-pixabay-277319.jpg&fm=jpg"]', '2', 'brand-timeless', 50),
('watch-6', 'Digital Watch', 'Durable digital watch with multiple features.', 80, 8, '["https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?cs=srgb&dl=pexels-pixabay-125779.jpg&fm=jpg"]', '2', 'brand-digitech', 40),
('10001', '4K Ultra Monitor Pro', 'Professional 4K Ultra HD monitor with HDR and 144Hz refresh rate.', 45000, 5, '["https://www.hp.com/ca-en/shop/Html/Merch/Images/c08894635_1750x1285.jpg"]', '3', 'brand-ultraview', 50),
('10002', '4K Ultra Monitor Slim', 'Slim bezel 4K Ultra HD monitor, perfect for multi-screen setups.', 40000, 8, '["https://www.simplyshopping.in/cdn/shop/files/3225.jpg?v=1729758108"]', '3', 'brand-slimtech', 40),
('10003', '4K Ultra Monitor Curved', 'Curved 4K Ultra HD monitor for immersive viewing experience.', 48000, 10, '["https://www.tpstech.in/cdn/shop/products/DellU2723QE27-inch4Kmonitor-tpstech.in-06.jpg?v=1681882673&width=533"]', '3', 'brand-curveplus', 30),
('1664', 'Running Shoes', 'Comfortable running shoes for daily workouts.', 1220, 10, '["https://assets.ajio.com/medias/sys_master/root/20241104/ew9I/6728b3d7260f9c41e8bcdfc0/-1117Wx1400H-466481202-grey-MODEL3.jpg"]', '4', 'brand-002', 100),
('8e', 'Formal Shoes', 'Elegant formal shoes for office and events.', 150, 10, '["https://alonzoshoes.in/cdn/shop/files/DSC_0720.jpg?v=1703764708&width=1946"]', '4', 'brand-101', 32),
('9e', 'Sneakers', 'Stylish sneakers for casual wear.', 90, 10, '["https://m.media-amazon.com/images/I/614aiM56siL._AC_UY1000_.jpg"]', '4', 'brand-101', 32),
('20', 'Mashable', 'this is the best laptop of 2024', 112290, 0, '["https://helios-i.mashable.com/imagery/articles/05djrP5PjtVB7CcMtvrTOAP/images-4.fill.size_2000x1125.v1723100793.jpg"]', '5', 'lenovo', 100),
('9587', 'Apple Macbook Air', 'Best Professional Laptop', 299999, 10, '["https://images-cdn.ubuy.co.in/65923d87b2c34c79fe086fa9-apple-macbook-air-i5-4260u-md711ll-b.jpg"]', '5', 'Asus', 100),
('9588', 'Dell Inspiron 15', 'Best Gaming Laptop', 199999, 10, '["https://m.media-amazon.com/images/I/71+0J6q2YtL._AC_UY1000_.jpg"]', '5', 'Dell', 100),
('9589', 'HP Pavilion 14', 'Best Budget Laptop', 49999, 10, '["https://www.hp.com/ch-de/shop/Html/Merch/Images/9Z8X2EA-UUZ_1750x1285.jpg"]', '5', 'HP', 100),
('m-001', 'Smartphone X1', 'Latest flagship smartphone with OLED display and 5G connectivity.', 799, 5, '["https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"]', '6', 'brand-mobix', 150),
('m-002', 'Smartphone Y2', 'Affordable smartphone with long battery life and dual cameras.', 399, 8, '["https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg"]', '6', 'brand-yphone', 200),
('m-003', 'Moto Fusion 60', 'Mid-range smartphone with great performance and camera.', 599, 10, '["https://motorolain.vtexassets.com/arquivos/ids/159339-1200-auto?width=1200&height=auto&aspect=true"]', '6', 'brand-mototech', 120),
('t-001', 'Tablet Pro 12', 'High-performance tablet with 12-inch Retina display and stylus support.', 1200, 10, '["https://cdn.thewirecutter.com/wp-content/media/2024/05/protablets-2048px-232431.jpg?auto=webp&quality=75&width=1024"]', '7', 'brand-tabpro', 60),
('t-002', 'Tablet Mini 8', 'Compact 8-inch tablet, perfect for reading and browsing.', 600, 5, '["https://cdn.thewirecutter.com/wp-content/media/2024/05/protablets-2048px-232422.jpg?auto=webp&quality=75&width=1024"]', '7', 'brand-tabmini', 80),
('t-003', 'Tablet Lite 10', 'Affordable 10-inch tablet with long battery life.', 400, 8, '["https://suprememobiles.in/cdn/shop/files/1_0b4b938f-c7ef-43f4-87af-0c26335601ca.png?v=1709549982"]', '7', 'brand-tablite', 100),
('h-001', 'Wireless Headphones', 'Noise-cancelling over-ear wireless headphones with 30-hour battery life.', 250, 15, '["https://www.montblanc.com/variants/images/46353151655575960/A/w2500.jpg"]', '8', 'brand-soundmax', 80),
('h-002', 'Gaming Headset', 'Surround sound gaming headset with detachable microphone.', 120, 10, '["https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg"]', '8', 'brand-gamerz', 60),
('h-003', 'In-Ear Earbuds', 'Compact in-ear earbuds with deep bass and sweat resistance.', 60, 5, '["https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg"]', '8', 'brand-earfit', 150),
('tv-001', 'Smart TV Ultra HD', '55-inch Ultra HD Smart TV with HDR and voice control.', 1200, 10, '["https://rukminim2.flixcart.com/image/850/1000/xif0q/television/k/h/w/-original-imah3868qdatnqg8.jpeg?q=90&crop=false"]', '9', 'brand-visionplus', 40),
('tv-002', 'Smart TV OLED', '65-inch OLED Smart TV with Dolby Vision and built-in apps.', 2500, 12, '["https://dianora.in/wp-content/uploads/2023/02/65-webos-4k-smart-tv-1.png"]', '9', 'brand-oledmax', 25),
('tv-003', 'Smart TV QLED', '50-inch QLED Smart TV with 4K resolution and streaming support.', 1500, 8, '["https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2025/01/smart-tv-buying-tips-1737374031.webp"]', '9', 'brand-qledstar', 30),
('drone-001', 'AeroDrone X5', 'Advanced drone with 4K camera and GPS stabilization.', 1200, 10, '["https://m.media-amazon.com/images/I/51Lwr0PbKrL._AC_UF1000,1000_QL80_.jpg"]', '10', 'brand-aerotech', 25),
('drone-002', 'SkyFlyer Mini', 'Compact drone for beginners with easy controls.', 400, 5, '["https://tele2iot.com/wp-content/uploads/2023/02/Article_Drones_2500px-2.jpg.webp"]', '10', 'brand-skyflyer', 50),
('drone-003', 'ProQuad 8K', 'Professional drone with 8K video and obstacle avoidance.', 2500, 15, '["https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg"]', '10', 'brand-proquad', 10),
('vr-001', 'VR Explorer Pro', 'High-end virtual reality headset with 4K resolution and wide field of view.', 1200, 10, '["https://cdn.thewirecutter.com/wp-content/media/2024/10/vrheadsets-2048px-08406.jpg"]', '11', 'brand-vrtech', 30),
('vr-002', 'VR Lite', 'Lightweight VR headset suitable for mobile devices and casual gaming.', 400, 5, '["https://www.pcworld.com/wp-content/uploads/2023/04/pcw-vr-hub-100839587-orig.jpg?quality=50&strip=all&w=1024"]', '11', 'brand-vrlite', 50),
('vr-003', 'VR Immersion X', 'Immersive VR headset with advanced motion tracking and surround sound.', 900, 8, '["https://www.cnet.com/a/img/resize/1808d7dcca0af8a52560fe90688ee26c1f4ea8ea/hub/2024/10/11/a2c373a9-aa5c-4c5a-b092-2d78051b8e5e/meta-quest-3s-1.jpg?auto=webp&height=500"]', '11', 'brand-immersionx', 20),
('proj-001', 'Home Cinema Projector', '4K UHD projector with HDR support for home theaters.', 1800, 10, '["https://image.benq.com/is/image/benqco/interactive-15?$ResponsivePreset$&wid=1000&dpr=off"]', '12', 'brand-cinemax', 25),
('proj-002', 'Portable Mini Projector', 'Compact portable projector, ideal for travel and presentations.', 350, 5, '["https://media.wired.com/photos/629feede5da297afa9ff5e6f/master/pass/Home-Theater-Gear-GettyImages-95781853.jpg"]', '12', 'brand-miniview', 40),
('proj-003', 'Business Laser Projector', 'High-brightness laser projector for conference rooms and offices.', 2200, 12, '["https://prohifi.in/cdn/shop/files/225459_LX-NZ3BG_front_875x700.jpg?v=1700226113"]', '12', 'brand-laserpro', 15);

