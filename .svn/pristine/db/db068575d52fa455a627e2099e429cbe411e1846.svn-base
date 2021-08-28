<template>
	<div class="websocket">
		
	</div>
</template>

<script type="text/ecmascript-6">
import { baseImgPath } from '@/config/env'
import { delCookie, getCookie,removeStore,delCookieAll } from '@/config/mUtils'
import {UpdateUserPassword} from "@/api/myData"

export default {
	data() {
		return {
			baseImgPath,
			imgPath: "",
			name:"",
			customerCode:'',
            cusMes:{},
            serTypeCode:getCookie("serTypeCode"),//002 设计师  008药房
		}
	},

    mounted() {
        if(this.serTypeCode == '002'){
            this.getTips()
        }
        if(this.serTypeCode == '008'){
            this.getWarningMes()
        }
    },
	methods: {
		getTipsMes(){//设计师排号提示

        },
        getWarningMes(){//药品预警

        }
	},
	components:{

	}
}
</script>

<style lang="less" scoped>

</style>
