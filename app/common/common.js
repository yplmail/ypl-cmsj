
const common = {
   minutes : (ms) => {
		let m = parseInt(ms / (1000*60));
		let s = parseInt((ms % (1000*60))/1000);
		return m + ':' + s ;
   }
}

export default common;