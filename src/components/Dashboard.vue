<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5 class="text-center">Dashboards</h5>
				<DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9">
					<template #header>						
						<div class="grid grid-nogutter">
							<div class="col-6 text-left ">
								<span class="p-buttonset">
									<Button v-for="setor in setores" :key="setor" @click="getDashboard(setor.nickname)" class="p-button-plain p-button-text"><span class="font-bold">{{setor.name}}</span></Button>
								</span>
							</div>
							<div class="col-6 text-right">
								<DataViewLayoutOptions v-model="layout" />
							</div>
						</div>
						<div>
							<Dialog header="Senha" v-model:visible="display" :closable="false" :breakpoints="{'960px': '75vw'}" :style="{width: '30vw'}" :modal="true">
								<div class="flex align-items-center justify-content-center">
									<Password :class="{'p-invalid': isInvalid}" v-model="password" :feedback="false"></Password>
								</div>
								<template #footer>
									<Button label="Cancel" @click="close()" icon="pi pi-times" class="p-button-outlined p-button-danger"/>
									<Button label="Ok" @click="getPassword()" icon="pi pi-check" class="p-button-outlined"/>	
								</template>
							</Dialog>
						</div>
					</template>
					<template #list="slotProps">
						<div class="col-12">
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full">
								<img :src="'images/dashboard/' + slotProps.data.image" :alt="slotProps.data.name" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl">{{slotProps.data.name}}</div>
									<div class="mb-3">{{slotProps.data.description}}</div>
								</div>
								<div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
									<Button v-if="slotProps.data.password" @click="open(slotProps.data.password)" icon="pi pi-eye" label="Visualizar" class="mb-2"></Button>
									<Button v-else @click="goToView(slotProps.data.id,slotProps.data.id)" icon="pi pi-eye" label="Visualizar" class="mb-2"></Button>
								</div>
							</div>
						</div>
					</template>
					<template #grid="slotProps">
						<div class="col-12 md:col-4">
							<div class="card m-3 border-1 surface-border">
								<div class="text-center">
									<img :src="'images/dashboard/' + slotProps.data.image" :alt="slotProps.data.name" class="w-9 shadow-2 my-3 mx-0"/>
									<div class="text-2xl font-bold">{{slotProps.data.name}}</div>
									<div class="mb-3">{{slotProps.data.description}}</div>
									<Button v-if="slotProps.data.password" @click="open(slotProps.data.password,slotProps.data.id)" icon="pi pi-eye"></Button>
									<Button v-else @click="goToView(slotProps.data.id)" icon="pi pi-eye" class="mb-2"></Button>
								</div>
								<div class="flex align-items-center justify-content-between">
								</div>
							</div>
						</div>
					</template>
				</DataView>
			</div>
		</div>
	</div>
</template>

<script>
import DashboardService from "../service/DashboardService";

export default {
	data() {
		return {
				display: false,
				dataviewValue: null,
				setores: null,
				layout: 'grid',
				sortKey: null,
				sortOrder: null,
				sortField: null,
				password: null,
				getPass: null,
				isInvalid: false,
				getId: null,
		}
	},
	mounted() {
		this.getDashboard('geral');
		this.getSetores();
	},
	created() {
		this.dashboardService = new DashboardService();
	},
	methods: {
		getPassword(){
			if (this.getPass == this.password) {
				this.goToView(this.getId);
				this.getId = null;
				this.getPass = null;
				this.password = "";
			}else{
				this.isInvalid = true;
			}
		},
		open(pass,id) {
			this.getId = id;
			this.getPass = pass;
			this.display = true;
		},
		close() {
			this.getId = null;
			this.getPass = null;
			this.password = "";
			this.isInvalid = false;
			this.display = false;
		},
		goToView(id){
			this.$router.push({name: 'view', params: {id: id}});
		},
		getDashboard(code){
			this.dashboardService.getValues(code).then(data => this.dataviewValue = data);
		},
		getSetores(){
			this.dashboardService.getSetores().then(data => this.setores = data);
		}
	}
}
</script>