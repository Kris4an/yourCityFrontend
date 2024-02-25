function statusMap(status: string): string {
    switch(status){
        case 'waiting': return 'изчакване';
        case 'accepted': return 'приет';
        case 'denied': return 'отхвърлен';
        case 'hidden': return 'скрит';
    }
    return ''
}

export default { statusMap };