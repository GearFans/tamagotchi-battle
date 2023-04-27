# tamagotchi

<div align="center">

  <a href="https://academy.gear-tech.io/course/tamagotchi" target="_blank">
    <img src="https://lwfiles.mycourse.app/gear-academy-public/358d36a2f81e4bdfe7a2935ca08511d5.png" width="480" alt="Gitpod">
  </a>

</div>


宠物内部状态的定义

./src/lib.rs

```
#[derive(Default, Encode, Decode, TypeInfo)]
pub struct Tamagotchi {
    // 名字
    pub name: String,
    // 生日
    pub date_of_birth: u64,
    // 主人
    pub owner: ActorId,
    // 饱足感, 初始 10_000
    pub fed: u64,
    // 上次投喂时间
    pub fed_block: u64,
    // 心情值, 初始 10_000
    pub entertained: u64,
    // 上次玩耍时间
    pub entertained_block: u64,
    // 体力值, 初始 10_000
    pub rested: u64,
    // 上次休息的时间
    pub rested_block: u64,
}
```

每隔一段时间, 饱足感, 心情值, 体力值都会下降, 需要进行 投喂/玩耍/睡觉 活动恢复

./io/src/lib.rs

```
#[derive(Encode, Decode, TypeInfo, Debug)]
pub enum TmgAction {
    // 投喂
    Feed,
    // 玩耍
    Play,
    // 睡觉
    Sleep,
    // 查询名称
    Name,
    // 查询年龄
    Age,
    // 查询信息
    TmgInfo,
}
```

由 `handle()` 函数来根据收到的消息触发相应的动作/回应

```
#[no_mangle]
extern "C" fn handle() {
    let action: TmgAction = ...;
    ...
    match action {
        TmgAction::Name => ...,
        TmgAction::Age => ...,
        TmgAction::Feed => tmg.feed(),
        TmgAction::Play => tmg.play(),
        TmgAction::Sleep => tmg.sleep(),
        TmgAction::TmgInfo => tmg.tmg_info(),
    }
}
```

当饱足感, 心情值, 体力值全部降为 0 时, 宠物会死亡

可以通过下面的方式查询宠物的各项指标:

./state/src/lib.rs

```
#[metawasm]
pub mod metafns {
    pub type State = Tamagotchi;

    pub fn current_state(state: State) -> TmgCurrentState {
        let fed = ...;
        let entertained = ...;
        let rested = ...;
        let current_state = TmgCurrentState { fed, entertained, rested};
        current_state
    }
}

#[derive(Encode, Decode, TypeInfo)]
pub struct TmgCurrentState {
    pub fed: u64,
    pub entertained: u64,
    pub rested: u64,
}
```

问题1: 编译并部署你的专属 Tamagotchi 合约

问题2: 查看你的宠物状态: 饱足感, 心情值, 体力值, 并向它发送消息来改变其状态

问题3: 修改 `init()` 函数, 在创建时自定义宠物的名字
