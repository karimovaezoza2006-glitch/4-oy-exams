const getData = async(url) => {
    const res = await(await fetch(url)).json();
    return res;
}

export { getData };