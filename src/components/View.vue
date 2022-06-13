<template>
    <div class="grid p-fluid">
        <div class="col-12">
            <div class="card text-center">
                <iframe title="Oee" width="1024" height="612" :src="url" frameborder="0" allowFullScreen="true"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import DashboardService from "../service/DashboardService";
export default {
    data(){
        return{
            url: null,
        }
    },
    created(){
		this.dashboardService = new DashboardService();
    },
    mounted(){
        this.onLoad(this.$route.params.id);
    },
    methods: {
        getUrl(id){
            this.dashboardService.getUrl(id).then(res => this.url = res.url);
        },
        onLoad(id){
            this.getUrl(id)
        }
    },

}
</script>