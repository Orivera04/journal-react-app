import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: 'duyrsdq1x',
  api_key: '239199853588868',
  api_secret: 'Hrv1JKCPfYIyFnNwez3M582blz8',
  secure: true
});

describe('Pruebas en fileUpload', () => {

  test('debe subir el archivo correctamente a cloudinary', async() => {

    const imageUrl = 'https://images.unsplash.com/photo-1612144431180-2d672779556c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hbGwlMjBzaXplfGVufDB8fDB8fHww'
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');

    const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId]);
    // console.log(cloudResp);
  });

  test('debe de retornar null', async() => {
    const file = new File([], 'foto.jpg');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});