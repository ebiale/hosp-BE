getMenuFE = (role = 'USER_ROLE') => {
    const menu = [{
        title: 'Dashboard',
        icon: 'mdi mdi-gauge',
        submenu: [
            {title: 'Main', url: '/'},
            {title: 'Chart', url: 'chart'},
            {title: 'ProgressBar', url: 'progress'},
            {title: 'Promises', url: 'promises'},
            {title: 'RxJs', url: 'rxjs'},
        ]},
        {
        title: 'Administration',
        icon: 'mdi mdi-folder-lock-open',
        submenu: [
            {title: 'Hospitals', url: 'hospitals'},
            {title: 'Doctors', url: 'doctors'}
        ]}];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.push({title: 'Users', url: 'users'})
    }

    return menu;
};

module.exports = {
    getMenuFE
};
