<template>
  <div>
    StatusPopupだよ
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import StatusHeader from '@/components/room/virtualSpace/avatar/statusPopup/StatusHeader.vue';
import UserStatus from '@/components/global/UserStatus.vue';

@Component({
  components: {
    StatusHeader,
    UserStatus,
  },
})
export default class StatusPopup extends Vue {

}
</script>
