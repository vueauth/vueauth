const laravelTestApiDir = '../sanctum/test-api'

/**
 * Create artisan commands to run in the Laravel
 * docker container
 */
export default function artisan (commands: string[] | string) {
  let returnCommand = `cd ${laravelTestApiDir} && `

  if (Array.isArray(commands)) {
    returnCommand += commands.map(command => {
      return `docker exec laravel_vue_auth_test_api php artisan ${command}`
    })
      .join(' && ')
  } else {
    returnCommand += `docker exec laravel_vue_auth_test_api php artisan ${commands}`
  }

  return returnCommand
}
