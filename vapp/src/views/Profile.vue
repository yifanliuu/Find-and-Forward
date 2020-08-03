<template>
    <div class="pa-3">
        <Default>
            <v-card color="dark" class="fill-height">
                <v-card-title class="text-center justify-center py-6">
                    <h2 class="font-weight-bold display-3">
                        {{ username }}, 欢迎您!
                    </h2>
                </v-card-title>
                <v-card-subtitle class="text-center justify-center py-6">
                    <p>我的地址：{{ user_address }}</p>
                </v-card-subtitle>

                <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    color="dark"
                    grow
                >
                    <v-tab v-for="(item,idx) in items" :key="(item,idx)">
                        <a :class="{'nav-link':true,active:idx===activeIndex}" href="#" @click="changeIdx(idx)">{{item}}</a>                        
                    </v-tab>
                     
                </v-tabs>

               
                <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in items" :key="item">
                        <v-card color="dark" flat>
                
                            <v-card-text >                       
                                 <div v-for="(content,idx) in contents" :key="(content,idx)">
                                 <div v-show="idx===activeIndex" >{{content}}</div>
                                 </div>                        
                            </v-card-text>
                            <v-card-text>{{ newline }}</v-card-text>
                            
                            <v-card-text>{{ text }}</v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>


            </v-card>
        </Default>
    </div>
</template>

<script>
// @ is an alias to /src
import Default from "../layout/default";

export default {
    name: "Profile",
    components: {
        Default,
    },
    data() {
        return {
            tab: null,
            items: ["我的任务", "我的贡献", "我的奖励", "我的余额"],
            contents: ["here is my task",
            "here is my contribution",
            "here is my reward",
            "here is my left money"],
            newline: "\n",
            text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            username: "yifan",
            user_address: "0x11111111",
        };
    },
    methods:{
            changeIdx:function(idx){
               this.activeIndex = idx;
            }
         }
};
</script>
