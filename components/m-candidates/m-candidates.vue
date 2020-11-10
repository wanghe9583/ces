<template>
	<view>
		<text @click="isShow=true" v-show="!isShow">{{title}}</text>
		<view v-show="isShow" class="rec-item view">
		 <select-tree @choose='choose' :value="selectList" :chooseclick="getId"  ref='selectTree'></select-tree>
		 <button @click="dispose()" class="btn-sub">提交</button>
		 </view>
	</view>
</template>

<script>
import selectTree from "../DLHTX-select_tree/select-tree.vue"
 export default {
	    name: 'candidates',
	    props: {
		  title: {
			type: String,
			default: "请选择"
		 },
		 submit:{
			 type:Function,
			 default:null
		 },
		},
        components: {
            selectTree,
        },
        data() {
            return {
				isShow:false,
				beingList:[],
                selectList:  [
					{
					    name: '全部',
					    childrenList: []
					},
                   
                ]
            }
        },
        methods: {
            choose(e){
				this.beingList=e;
            },
            chooseAll(){
                this.$refs.selectTree.chooseAll()
				
            },
            cancelAll(){
                this.$refs.selectTree.cancelAll()
            },
			dispose(){
			   this.submit(this.beingList);
			   this.isShow=false;
			},
			getId(index){
				let rid=this.selectList[index].rid;
				if(rid=="00"){
					rid="01";
				}
				this.$api.post(this.config.teacherBaseUrl,"Teacher/ByCondition",{deptId:rid}, res => {
						 this.selectList[index].childrenList=res.data;
				})
			}
        },
		mounted(){
			this.$api.get(this.config.schoolServiceBaseUrl,"Department",null, res => {
				 // this.selectList.childrenList
				 let all={
					 rid:"00",
					 name: '全部',
					
				 }
				 res.data.unshift(all)
				 res.data.forEach(x=>{
					x.checked=false;
					x.show=false;
					x.childrenList=[];
				})
				this.selectList=res.data;
			}),
			this.$api.post(this.config.teacherBaseUrl,"Teacher/ByCondition",{}, res => {
				res.data.forEach(x=>{
					x.checked=false;
				})
				 this.selectList[0].childrenList=res.data;	 
			})
		},
    }
</script>

<style>
.rec-item {
    margin:0;
}
</style>
