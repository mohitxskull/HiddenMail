const Fetcher = (URL: string) => fetch(URL).then((res) => res.json());

export default Fetcher;
