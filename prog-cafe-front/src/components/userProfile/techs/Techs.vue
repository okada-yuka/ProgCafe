<template>
  <div class="techs">
    <h4>Techs</h4>
    <ul>
      <template v-for="skill in skills">
        <li :key="skill">
          <Tech :skill="skill" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tech from '@/components/userProfile/techs/Tech.vue';

@Component({
  components: {
    Tech,
  },
})
export default class Techs extends Vue {
  @Prop({ required: true })
  skills!: string[];
}
</script>

<style lang="scss" scoped>
  .techs {
    margin-top: 80px;
    h4 {
      font-size: 1.5em;
      font-weight: bold;
      text-decoration: underline;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      padding: 0;
    }
    li {
      margin: 1vh 1.5vw;
    }
  }
</style>
