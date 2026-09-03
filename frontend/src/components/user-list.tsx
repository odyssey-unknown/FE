"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const USER_API_URL = "https://jsonplaceholder.typicode.com/users";

export function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(USER_API_URL + "?q=" + keyword)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const averageScore =
    users.reduce((acc, user) => acc + user.score, 0) / users.length;

  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
  );

  return (
    <div className="flex w-full flex-col gap-3">
      <input
        className="rounded border px-2 py-1"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <p className="text-sm text-zinc-600">평균 점수: {averageScore.toFixed(1)}</p>

      {loading ? <p className="text-sm">불러오는 중...</p> : null}

      {filteredUsers.map((user, index) => (
        <div
          key={index}
          className="cursor-pointer rounded border px-3 py-2"
          onClick={() => alert(user.name)}
        >
          <span dangerouslySetInnerHTML={{ __html: user.name }} />
        </div>
      ))}

      <Button onClick={() => setUsers([])}>초기화</Button>
    </div>
  );
}
