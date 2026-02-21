export default async function handler(req, res) {
  const { userid } = req.query;

  if (!userid) {
    return res.status(400).json({ error: "Missing userid parameter" });
  }

  try {
    // Obtener seguidores
    const followersResponse = await fetch(
      `https://friends.roblox.com/v1/users/${userid}/followers/count`
    );

    // Obtener seguidos
    const followingResponse = await fetch(
      `https://friends.roblox.com/v1/users/${userid}/followings/count`
    );

    if (!followersResponse.ok || !followingResponse.ok) {
      return res.status(404).json({ error: "User not found" });
    }

    const followersData = await followersResponse.json();
    const followingData = await followingResponse.json();

    return res.status(200).json({
      userId: userid,
      followers: followersData.count,
      following: followingData.count,
    });

  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
