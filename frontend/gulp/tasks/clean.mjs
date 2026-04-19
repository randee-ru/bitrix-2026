import del from 'del';


export const clean = () => {
    // build лежит в ../www/... — вне cwd frontend/; без force del отказывается удалять
    return del(app.path.clean, { force: true });
}