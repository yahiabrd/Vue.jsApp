<template>
    <div class="container profile">
        <div class="alert alert-danger" role="alert" v-if="error">
            {{ error }}
        </div>
        <div class="alert alert-success" role="alert" v-if="success">
            {{ success }}
        </div>
        <input type="search" placeholder="Country name" v-model="name" /> 
        <button @click="search">Search</button>
        <p>You can see your added cities on the favorite page</p>
        <div class="weather" v-if="found">
            <h3>{{ name2 }}</h3>

            État : {{ weather }} <br>
            Temperature : {{ mainTemp.temp }} <br>
            Temperature Min : {{ mainTemp.temp_min }} <br>
            Temperature Max : {{ mainTemp.temp_max }} <br>
        
            <button type="button" class="btn btn-primary" @click="save">Save</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Profile",
    data() {
        return {
            found: false,
            error: '',
            success: '',
            name: '',
            name2: '',
            mainTemp: [],
            weather: ''
        }
    },
    methods: {
        search() {
            if (this.name) {
                var key = "64a8e13502e47c84bdedd706c3e67ec9";
                var link = `http://api.openweathermap.org/data/2.5/weather?q=${this.name}&APPID=${key}&units=metric`
                
                axios
                    .get(link)
                    .then((response) => {
                        this.error = ''
                        this.found = true
                        this.mainTemp = response.data.main
                        this.weather = response.data.weather[0].main
                        this.name2 = response.data.name
                    })
                    .catch(() => {
                        this.error = "Not found..."
                        this.found = false
                    })
            }
        },
        async save() {
            this.$store.dispatch("save", {name: this.name2, email: this.$store.state.email}).then(() => {
                this.success = "Successfully saved"
                this.error = ''
            }).catch(() => {
                this.error = "Saving error..."
                this.success = ''
            })
        }
    }
}
</script>

<style scoped>
.weather {
    border: 1px solid black;
    border-radius: 10px;
    margin-top:20px;
}
</style>