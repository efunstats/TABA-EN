var app = new Vue({
    el:'#listCards',
    data:{
        nameFilter:'',
        factionFilter:'',
        rarityFilter:'',
        gachaFilter:'',
        orderSelect:'',

        codeCardsSelect:'2',
        eventSelect:'8',
        skillSelect:'',
        cardTeam1:'',
        cardTeam2:'',
        cardTeam3:'',
        cardTeam4:'',
        cardTeam5:'',
        levelSelect1:'lv1',
        levelList:[
            {value:'lv1'},
            {value:'lv2'},
            {value:'lv3'},
            {value:'lv4'},
            {value:'lv5'}
        ],
        factionList:[
            {label:'All', value:''},
            {label:'Taimanin', value:'Taimanin'},
            {label:'Demon', value:'Demonios'},
            {label:'UFS', value:'UFS'}
        ],        
        rarityList:[
            {label:'All', value:''},
            {label:'LR',value:'1'},
            {label:'UR',value:'2'},
            {label:'SR',value:'3'},
            {label:'HR',value:'4'},
            {label:'R',value:'5'}
        ],        
        gachaList:[
            {label:'All', value:''},
            {label:'Permanent', value:'Permanent'},    
            {label:'Limited', value:'Limited'},
            {label:'Event Rewards', value:'Event Rewards'},
            {label:'Pre-Registration Rewards', value:'Pre-Registration Rewards'}            
        ],        
        orderList:[
            {label:'Default', value:''},
            {label:'ATK(min to max)', value:'atkMinMax'},
            {label:'ATK (max to min)', value:'atkMaxMin'},
            {label:'DEF (min to max)', value:'defMinMax'},
            {label:'DEF (max to min)', value:'defMaxMin'},        
            {label:'Release Date (newer to oldest)', value:'dateNO'},
            {label:'Release Date (oldest to newer)', value:'dateON'}
        ],
        cards:[],
        skills:[],
        events:[],
        cardProfile:{},
        eventProfile:{},
        cardsSimilarSkill:[]      
    },
    methods: {
        cardInfo:function(code){
            if(code !==  null){
                this.codeCardsSelect=code
            }
            let cardInfoSkill= this.skills.filter(skill=> skill.codejp==this.codeCardsSelect)
            let cardInfoData= this.cards.filter(card=> card.codejp==this.codeCardsSelect)
            this.cardProfile={
                "imgurl" : cardInfoData[0].imgurl,
                "name" :  cardInfoData[0].name,
                "rarity" : cardInfoData[0].rarity,
                "atkmax" : cardInfoData[0].atkmax,
                "defmax": cardInfoData[0].defmax,
                "cost": cardInfoData[0].cost,
                "skill": cardInfoData[0].skill,
                "gacha": cardInfoData[0].gacha,
                "illustrator": cardInfoData[0].illustrator,
                "va":cardInfoData[0].va,
                "factioncolor": cardInfoData[0].factioncolor,
                "effect": cardInfoSkill[0].skilleffect,
                "effect2": cardInfoSkill[0].skilleffect2,
                "typeEffect": cardInfoSkill[0].typeeffect,
                "lv1": cardInfoSkill[0].lv1,
                "lv2": cardInfoSkill[0].lv2,
                "lv3": cardInfoSkill[0].lv3,
                "lv4": cardInfoSkill[0].lv4,
                "lv5": cardInfoSkill[0].lv5,
                "skillfilter":cardInfoData[0].skillfilter,
                "atkrank":cardInfoData[0].atkrank,
                "defrank":cardInfoData[0].defrank,
                "atkskillrank":cardInfoData[0].atkskillrank,
                "defskillrank":cardInfoData[0].defskillrank
            }
            // this.codeCardsSelect=code
            this.cardsSimilarSkill = this.cards.filter(card=> card.skillfilter.includes(this.cardProfile.skillfilter))
                                    .sort(function(a, b){return b.atkmax-a.atkmax;}) 
                                    .sort(function(a, b){return a.orderrarity-b.orderrarity;}) 
            console.log(this.cardsSimilarSkill);
        },
        eventInfo:function(code){

            if(code !==  null){
                this.eventSelect=code
            }

            let eventInfoData= this.events.filter(event=> event.codeevent==this.eventSelect)
            
            this.eventProfile={
                "codeevent" : eventInfoData[0].codeevent,
                "typeevent" : eventInfoData[0].typeevent,
                "nameevent" : eventInfoData[0].nameevent,
                "imgevent" : eventInfoData[0].imgevent,
                "startevent" : eventInfoData[0].startevent,
                "newcontent" : eventInfoData[0].newcontent,
                "newcontent1" : eventInfoData[0].newcontent1,
                "newcontent2" : eventInfoData[0].newcontent2
            }
        },
        home:function(dato){
            document.getElementById("page1").style.display = "none";
            document.getElementById("page2").style.display = "none";
            document.getElementById("page3").style.display = "";
            this.eventInfo(dato);
        },
        page2:function(){
            document.getElementById("page1").style.display = "";
            document.getElementById("page2").style.display = "none";
            document.getElementById("page3").style.display = "none";
        },
        page1:function(dato){
            document.getElementById("page1").style.display = "none";
            document.getElementById("page3").style.display = "none";
            document.getElementById("page2").style.display = "";
            this.cardInfo(dato);
        },
    }
    ,
    created:
        function(){
            this.cards=[];
            fetch('https://spreadsheets.google.com/feeds/list/1HETOccLbHyBhnGbdQ44MwIuEBsv1m2Qk6URTxTCCyD0/1/public/values?alt=json')
            .then(res => res.json())
            .then(data =>{
                for (let ind of data.feed.entry){
                    let temp={
                    "codejp": ind.gsx$codejp.$t,
                    "rarity": ind.gsx$rarity.$t,
                    "faction": ind.gsx$faction.$t, 
                    "maxlevel": ind.gsx$maxlevel.$t,
                    "cost": ind.gsx$cost.$t,
                    "name" :  ind.gsx$name.$t,
                    "atkmax" : ind.gsx$atkmax.$t,
                    "defmax": ind.gsx$defmax.$t,
                    "skill": ind.gsx$skill.$t,
                    "effectlv5": ind.gsx$effectlv5.$t,
                    "illustrator": ind.gsx$illustrator.$t,
                    "va": ind.gsx$va.$t,
                    "gacha": ind.gsx$gacha.$t,
                    "imgurl" : ind.gsx$imgurl.$t,
                    "thumbnail": ind.gsx$thumbnail.$t,
                    "utc": ind.gsx$utc.$t,
                    "orderrarity": ind.gsx$orderrarity.$t,
                    "factioncolor": ind.gsx$factioncolor.$t,
                    "factioncolor2": ind.gsx$factioncolor2.$t,
                    "skillfilter": ind.gsx$skillfilter.$t,
                    "atkrank": ind.gsx$atkrank.$t,
                    "defrank": ind.gsx$defrank.$t,
                    "atkskillrank": ind.gsx$atkskillrank.$t,
                    "defskillrank": ind.gsx$defskillrank.$t
                    }
                    this.cards.push(temp);
                }    
            })
            this.skills=[];
            fetch('https://spreadsheets.google.com/feeds/list/1HETOccLbHyBhnGbdQ44MwIuEBsv1m2Qk6URTxTCCyD0/2/public/values?alt=json')
            .then(res => res.json())
            .then(data =>{
                for (let ind of data.feed.entry){
                    let temp={
                    "codejp": ind.gsx$codejp.$t,
                    "name" :  ind.gsx$name.$t,
                    "skilleffect": ind.gsx$skilleffect.$t,
                    "typeeffect": ind.gsx$typeeffect.$t,
                    "lv1":ind.gsx$lv1.$t,
                    "lv2":ind.gsx$lv2.$t,
                    "lv3":ind.gsx$lv3.$t,
                    "lv4":ind.gsx$lv4.$t,
                    "lv5":ind.gsx$lv5.$t,
                    "atkskillrank":ind.gsx$atkskillrank.$t,
                    "defskillrank":ind.gsx$defskillrank.$t,
                    "skilleffect2": ind.gsx$skilleffect2.$t
                    }
                    this.skills.push(temp);
                }    
            })
            this.events=[];
            fetch('https://spreadsheets.google.com/feeds/list/1HETOccLbHyBhnGbdQ44MwIuEBsv1m2Qk6URTxTCCyD0/3/public/values?alt=json')
            .then(res => res.json())
            .then(data =>{
                for (let ind of data.feed.entry){
                    let temp={
                    "codeevent": ind.gsx$codeevent.$t,
                    "typeevent": ind.gsx$typeevent.$t,
                    "nameevent" :  ind.gsx$nameevent.$t,
                    "imgevent": ind.gsx$imgevent.$t,
                    "startevent": ind.gsx$startevent.$t,
                    "newcontent":ind.gsx$newcontent.$t,
                    "newcontent1":ind.gsx$newcontent1.$t,
                    "newcontent2":ind.gsx$newcontent2.$t,
                    }
                    this.events.push(temp);
                }    
            })
            this.page2();
        },
    computed:{
        searchCard: function(){
            let lista= this.cards
            .filter((card) => card.name.toLowerCase().includes(this.nameFilter.toLowerCase()))
            .filter((card) => card.faction.includes(this.factionFilter))
            .filter((card) => card.orderrarity.includes(this.rarityFilter))
            .filter((card) => card.gacha.includes(this.gachaFilter))
              
            if(this.orderSelect==='atkMinMax'){
                return lista.sort(function(a, b){
                    return a.atkmax-b.atkmax;
                }) 
            } else if(this.orderSelect==='atkMaxMin'){
                return lista.sort(function(a, b){
                    return b.atkmax-a.atkmax;
                }) 
            } else if(this.orderSelect==='defMinMax'){
                return lista.sort(function(a, b){
                    return a.defmax-b.defmax;
                }) 
            } else if(this.orderSelect==='defMaxMin'){
                return lista.sort(function(a, b){
                    return b.defmax-a.defmax;
                }) 
            } else if(this.orderSelect==='dateNO'){
                return lista.sort(function(a, b){
                    return b.utc-a.utc;
                }) 
            } else if(this.orderSelect==='dateON'){
                return lista.sort(function(a, b){
                    return a.utc-b.utc;
                }) 
            } else{
                return lista.sort(function(a, b){
                    return b.utc-a.utc;
                }) 
            }              
        }
    }    
});





// const app = new Vue({
//     el:'#app',
//     data:{
//         titulo: 'GYM con VUE',
//         tareas:[],
//         nuevaTarea:''
//     },
//     methods:{
//         agregarTarea: function(){
//             // console.log('agregar',this.nuevaTarea);
//             this.tareas.push({
//                 nombre: this.nuevaTarea,
//                 estado:false
//             })
//             // console.log(this.tareas);
//             this.nuevaTarea='';
//             localStorage.setItem('gym-vue',JSON.stringify(this.tareas));
//         },
//         editarTarea: function(index){
//             // console.log( index);
//             this.tareas[index].estado=true;
//             localStorage.setItem('gym-vue',JSON.stringify(this.tareas));
//         },
//         eliminarTarea:function(index){
//             // console.log( index);
//             this.tareas.splice(index,1);
//             localStorage.setItem('gym-vue',JSON.stringify(this.tareas));
//         }
//     },
//     created: function(){
//         let datosDB= json.parse(localStorage.getItem('gym-vue'));
//         if (datosDB ===null){
//             this.tareas=[];
//         }else{
//             this.tareas= datosDB;        
//         }
//     }
// });