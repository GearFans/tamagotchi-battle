# battle

游戏开始前, 由管理员部署此合约及配套前端

玩家通过前端填入各自 Tamagotchi 合约地址

当所有玩家就位后, 管理员开始游戏

玩家之间两两匹配, 进行战斗, 直到出现最后的赢家, 游戏结束

每组战斗最多有 5 个回合, 玩家被赋予 100 点初始生命值

5 个回合后生命值更高的玩家获胜, 如果一方生命值降为 0 则战斗提前结束

每回合开始时, 攻击力/防御力都会随机重置, 但每个玩家的攻击力 + 防御力 恒等于 100

每回合内, 每个玩家需要根据自身以及对手的能力选择攻击或防御, 超时未操作会被惩罚

根据以下规则计算生命值损伤

```
   A        B
[ 攻击 <=> 攻击 ] 双方都遭受与对方攻击力成正比 f(ATK) 的伤害
[ 防御 <=> 防御 ] 双方都无伤害
[ 攻击 <=> 防御 ] A 无伤害, 对 B 造成 f(A.ATK-B.DEF) 的伤害
[ 攻击 <=>  -   ] A 无伤害, 对 B 造成 f(A.ATK) 的伤害 + 系统随机惩罚
[ 防御 <=>  -   ] A 无伤害, B 遭受系统随机惩罚
[  -   <=>  -   ] A / B 均遭受系统随机惩罚
```
