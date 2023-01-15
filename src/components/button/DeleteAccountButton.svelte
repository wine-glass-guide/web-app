<script>
    import { navigate } from 'svelte-navigator';
    import { t } from '../../js/localization.js';
    import { request } from '../../js/fetch-wrapper.js';
    import { displayError, displaySuccess } from '../../js/toast.js';
    import { user } from '../../js/user.js';

    const handleOnDeleteUser = async () => {
      try {
        await request('/api/users/me', {
          method: 'DELETE',
        });

        $user = null;
        localStorage.clear();
        navigate('/login');

        displaySuccess($t('global.userDelete'));
      } catch (err) {
        displayError($t('global.error'));
      }
    };

</script>

<button class="btn btn-danger" on:click={handleOnDeleteUser}>
    {$t('settings.deleteAccountBtn')}
</button>
