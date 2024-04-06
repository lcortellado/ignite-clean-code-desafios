// Nomenclatura de variáveis

const userList = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getData(req, res) {
  const github = String(req.query.username)

  if (!github) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const githubUserData = await fetch(`https://api.github.com/users/${github}`);

  if (githubUserData.status === 404) {
    return res.status(400).json({
      message: `User with username "${github}" not found`
    })
  }

  const githubUserDataJson = await githubUserData.json()

  const sortedUsers = userList.sort((a, b) =>  b.followers - a.followers); 

  const userCategory = sortedUsers.find(sortedUser => githubUserDataJson.followers > sortedUser.followers)

  const result = {
    github,
    category: userCategory.title
  }

  return result
}

getData({ query: {
  username: 'josepholiveira'
}}, {})