<script lang="ts">
  import { allUsers } from "../data/users";
  import Arrow from "./arrow.svelte";

  let sortKey = "total";
	let reverse = false;
	let allUsersSize = allUsers.length;

  function getValue(user: any, sortKey: string = "total") {
    switch (sortKey) {
      case "A":
        return user.A;
      case "B":
        return user.B;
      case "C":
        return user.C;
      default:
        return user.A + user.B + user.C;
    }
  }

  $: Users = allUsers.sort(
    (a, b) => (getValue(b, sortKey) - getValue(a, sortKey)) * (reverse ? -1 : 1)
  );

  function RedToGreen(percent: number) {
    let r = Math.floor(255 * (1.25 - percent));
    let g = Math.floor(255 * (0.25 + percent));
    return `rgb(${r},${g},0)`;
  }

	function getRank(user: any, key: string) {
		let rank = 1;
		for (let i = 0; i < Users.length; i++) {
			if (getValue(Users[i], key) > getValue(user, key)) {
				rank++;
			}
		}
		return rank;
	}

	function getMedal(user: any) {
		let rank = getRank(user, "total");
		if (rank <= Math.ceil(allUsersSize/12)) {
			return "🥇 ";
		} else if (rank <= Math.ceil(allUsersSize/4)) {
			return "🥈 ";
		} else if (rank <= Math.ceil(allUsersSize/2)) {
			return "🥉 ";
		} else {
			return "🎖️ ";
		}
	}

  function showArrow(reverse: boolean) {
		console.log(reverse);
    return `
			<div class="my-auto mx-1">
				<Arrow ascending={reverse}/>
			</div>
		`;
  }
</script>

<div class="scoreboard">
  <table class="border-separate border-spacing-0 rounded-lg border border-gray-500 mx-auto overflow-hidden text-center">
    <thead>
      <tr>
        <th class="border-collapse border px-8 py-3 border-gray-500">Rank</th>
        <th class="border-collapse border px-8 py-3 border-gray-500">Name</th>
        <th class="border-collapse border px-8 py-3 border-gray-500">
          <button on:click={() => (
						reverse = sortKey === "A" ? !reverse : false,
						sortKey = "A"
					)}>
            <div class="flex flex-row">
              Teleslex
              {#if sortKey === "A"}
								<div class="my-auto mx-1">
									<Arrow ascending={reverse}/>
								</div>
							{/if}
            </div>
          </button>
        </th>
        <th class="border-collapse border px-8 py-3 border-gray-500">
          <button on:click={() => (
						reverse = sortKey === "B" ? !reverse : false,
						sortKey = "B"
					)}>
					 <div class="flex flex-row">
							Icy Land
							{#if sortKey === "B"}
								<div class="my-auto mx-1">
									<Arrow ascending={reverse}/>
								</div>
							{/if}
						</div>
					</button>
        </th>
        <th class="border-collapse border px-8 py-3 border-gray-500">
          <button on:click={() => (
						reverse = sortKey === "C" ? !reverse : false,
						sortKey = "C"
					)}>
						<div class="flex flex-row">
							Peteza's Function
							{#if sortKey === "C"}
								<div class="my-auto mx-1">
									<Arrow ascending={reverse}/>
								</div>
							{/if}
						</div>
					</button>
        </th>
        <th class="border-collapse border px-8 py-3 border-gray-500">
          <button on:click={() => (
						reverse = sortKey === "total" ? !reverse : false,
						sortKey = "total"
					)}>
						<div class="flex flex-row">
							Total
							{#if sortKey === "total"}
								<div class="my-auto mx-1">
									<Arrow ascending={reverse}/>
								</div>
							{/if}
						</div>
					</button>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each Users as user}
        <tr>
          <td class="border-collapse border px-8 py-3 border-gray-500"
            >{getRank(user, sortKey)}</td
          >
          <td class="whitespace-nowrap border-collapse border px-8 py-3 border-gray-500 text-left"
            >{getMedal(user)+user.name}</td
          >
          <td
            class="border-collapse border px-8 py-3 border-gray-500 font-bold"
            style="color: {RedToGreen(user.A / 100)}">{user.A}</td
          >
          <td
            class="border-collapse border px-8 py-3 border-gray-500 font-bold"
            style="color: {RedToGreen(user.B / 100)}">{user.B}</td
          >
          <td
            class="border-collapse border px-8 py-3 border-gray-500 font-bold"
            style="color: {RedToGreen(user.C / 100)}">{user.C}</td
          >
          <td
            class="border-collapse border px-8 py-3 border-gray-500 font-bold"
            style="color: {RedToGreen((user.A + user.B + user.C) / 300)}"
            >{user.A + user.B + user.C}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
