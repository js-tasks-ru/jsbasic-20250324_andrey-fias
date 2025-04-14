function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  for (const friend of friends) {
    const li = document.createElement('li');
    li.textContent = `${friend.firstName} ${friend.lastName}`;
    ul.appendChild(li);
  }

  return ul;
}
