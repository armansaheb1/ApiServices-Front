<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" style="margin-top: -2px;padding: 0 20%;border-radius: 0;opacity: 0.8;" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top">
        Account
      </CDropdownHeader>




      <CDropdownItem v-if="$store.state.isAuthenticated">
        <CIcon icon="cil-account-logout" /> Logout
      </CDropdownItem>


      <CDropdownItem @click="$store.state.loginPopUp = true" v-if="!$store.state.isAuthenticated">
        <CIcon icon="cil-input" /> Login
        <CBadge color="info" class="ms-auto"></CBadge>
      </CDropdownItem>

    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/13.png'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
}
</script>
