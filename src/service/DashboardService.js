export default class DashboardService {
	async getDashboards() {
		return fetch('data/dashboards.json').then(res => res.json()).then(d => d.data);
    }
	async getValues(code) {
		let _data = [];
		await this.getDashboards()
			.then(res => {
				res.forEach(element => {
					element.category.filter(f =>{
						if(f == code){
							_data.push(element)
						}
					})
				});
			});
		return _data;
    }
	async getUrl(id){
		let _data;
		console.log(id);
		await fetch('data/url.json')
			.then(res => res.json())
			.then(d => d.url)
			.then(res => {
				res.forEach(x => {
					if (x.id == id) {
						_data = x;
					}
				});
			});
		return _data;
	}
}