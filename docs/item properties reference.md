# ITEMS.TXT PROPERTIES REFERENCE

This document outlines all XML elements and attributes you can modify
within the `<Objects>` structure in your `items.txt` file to define in-game items.

---

## 1. `<Object>` ELEMENT ATTRIBUTES

Each item is defined by an `<Object>` element. It requires the following attributes:

* **`type`**
    * **Description:** A unique hexadecimal identifier for the item. This is used
        internally by the game client and server to identify the item.
    * **Type:** Hexadecimal String
    * **Example:** `type="0x0040"`

* **`id`**
    * **Description:** A unique string identifier for the item. This is primarily
        used for internal references (e.g., in `script.js`) and as the display name
        if `DisplayId` is not provided.
    * **Type:** String
    * **Example:** `id="Steel Dagger"`

* **`Item`**
    * **Description:** Must be set to `"true"` to signal that this `<Object>` represents a
        valid item that can be found or used in-game. Do not change this value.
    * **Type:** Boolean (`"true"`)
    * **Example:** `Item="true"`

---

## 2. `<Object>` CHILD ELEMENTS (PROPERTIES)

These elements are nested directly within the `<Object>` tag.

* **`<DisplayId>`**
    * **Description:** The user-facing name of the item shown in the game client
        and in the wiki. If this element is omitted, the `id` attribute will
        be used as the display name.
    * **Type:** String
    * **Example:** `<DisplayId>Shadowfang Blade</DisplayId>`

* **`<Class>`**
    * **Description:** Categorizes the item based on its primary function.
        Common values include `"Equipment"` (for weapons, armor, rings) and
        `"Ability"` (for class abilities like cloaks, spells, etc.).
    * **Type:** String
    * **Example:** `<Class>Equipment</Class>`

* **`<SlotType>`**
    * **Description:** A numeric identifier specifying which equipment slot the
        item belongs to, or its general type. This is crucial for item placement
        and filtering in the wiki.
    * **Type:** Integer
    * **Corrected List of Slot Types:**
        * `1`: Sword
        * `2`: Dagger
        * `3`: Bow
        * `4`: Tome
        * `5`: Shield
        * `6`: Leather Armor / Light Armor
        * `7`: Plate Armor / Heavy Armor
        * `8`: Wand
        * `9`: Ring
        * `10`: Consumables
        * `11`: Spell
        * `12`: Seal
        * `13`: Cloak
        * `14`: Robe
        * `15`: Quiver
        * `16`: Helms
        * `17`: Staves / Staffs
        * `18`: Poison
        * `19`: Skull
        * `20`: Trap
        * `21`: Orb
        * `22`: Prism
        * `23`: Scepter
        * `24`: Katana
        * `25`: Shuriken / Star
        * `26`: Wakizashi
        * `27`: Lute
        * `28`: Summoning Mace / Mace
        * `29`: Sheath
    * **Example:** `<SlotType>2</SlotType>` <!-- This is a Dagger -->

* **`<Description>`**
    * **Description:** A short text description of the item, providing lore or
        a brief overview of its function.
    * **Type:** String
    * **Example:** `<Description>A dagger imbued with dark energy, whispers secrets to its wielder.</Description>`

* **`<MinDamage>`**
    * **Description:** The minimum damage value a weapon can inflict per hit.
        Only applicable to weapon types.
    * **Type:** Integer
    * **Example:** `<MinDamage>120</MinDamage>`

* **`<MaxDamage>`**
    * **Description:** The maximum damage value a weapon can inflict per hit.
        Only applicable to weapon types.
    * **Type:** Integer
    * **Example:** `<MaxDamage>140</MaxDamage>`

* **`<RateOfFire>`**
    * **Description:** A multiplier for the weapon's attack speed. A value of
        `1.0` is standard. Higher values mean faster attacks; lower values mean slower attacks.
    * **Type:** Float
    * **Example:** `<RateOfFire>1.3</RateOfFire>` (30% faster attack speed)

* **`<MPCost>`**
    * **Description:** The mana (MP) cost required to use an ability item.
        Only applicable to ability items.
    * **Type:** Integer
    * **Example:** `<MPCost>70</MPCost>`

* **`<Defense>`**
    * **Description:** The defense bonus provided by armor, shields, or certain
        ability items. Reduces damage taken.
    * **Type:** Integer
    * **Example:** `<Defense>18</Defense>`

* **`<Range>`**
    * **Description:** The effective attack range for weapons, or the maximum
        cast range for certain abilities.
    * **Type:** Float
    * **Example:** `<Range>5.6</Range>`

* **`<ArcGap>`**
    * **Description:** The angle (in degrees) between projectiles fired by
        multi-shot weapons (e.g., bows).
    * **Type:** Float
    * **Example:** `<ArcGap>12.0</ArcGap>` (12 degrees between each projectile)

* **`<FameBonus>`**
    * **Description:** A percentage bonus to the fame gained while the item is
        equipped.
    * **Type:** Integer
    * **Example:** `<FameBonus>5</FameBonus>` (5% fame bonus)

* **`<Soulbound>`**
    * **Description:** If `"true"`, the item cannot be traded, dropped, or given to
        other players. It is permanently bound to the character who obtained it.
        Defaults to `"false"` if omitted.
    * **Type:** Boolean (`"true"` or `"false"`)
    * **Example:** `<Soulbound>true</Soulbound>`

* **`<UsableBy>`**
    * **Description:** A comma-separated list of character classes that are
        able to equip and use this item. If the item can be used by any
        class (e.g., rings), use `"All"`.
    * **Type:** String (comma-separated class names)
    * **Example:** `<UsableBy>Rogue, Assassin, Trickster, Ninja</UsableBy>`

* **`<ActivateOnEquip>`**
    * **Description:** Grants a passive stat bonus while the item is equipped.
        An item can have multiple `<ActivateOnEquip>` tags for different stats.
    * **Attributes:**
        * `stat`: Numeric ID of the stat to boost.
            * `19`: Max HP (Health Points)
            * `20`: Max MP (Mana Points)
            * `21`: Attack (ATT)
            * `22`: Defense (DEF)
            * `23`: Speed (SPD)
            * `24`: Dexterity (DEX)
            * `25`: Vitality (VIT)
            * `26`: Wisdom (WIS)
    * **Content:** The integer value of the stat boost.
    * **Example:** `<ActivateOnEquip stat="21">50</ActivateOnEquip>` <!-- +50 Max HP -->
    * **Example (multiple):**
        ```xml
        <ActivateOnEquip stat="21">5</ActivateOnEquip> <!-- +5 Attack -->
        <ActivateOnEquip stat="22">5</ActivateOnEquip> <!-- +5 Defense -->
        ```

* **`<Activate>`**
    * **Description:** A container element that defines the active ability or
        effect of an item (typically for class abilities). Can contain
        multiple effect tags.
    * **Child Elements (within `<Activate>`):**
        * **`<ConditionEffect effect="{effectName}" duration="{seconds}"/>`**
            * **Description:** Applies a status effect to the user or targets.
            * **Attributes:**
                * `effect`: Name of the condition effect (e.g., `"Invisible"`, `"Damaging"`,
                    `"Stunned"`, `"Healing"`, `"Poisoned"`, `"Slowed"`, `"Dazed"`, `"Exposed"`, `"Inspired"`).
                * `duration`: Duration of the effect in seconds.
        * **`<Teleport/>`**
            * **Description:** (Empty tag) Teleports the user to the mouse cursor's location.
        * **`<Decoy duration="{seconds}"/>`**
            * **Description:** Creates a temporary decoy.
            * **Attribute:**
                * `duration`: Duration of the decoy in seconds.
        * **`<Heal>`**
            * **Description:** Heals the user or targets for a specified amount.
            * **Content:** The integer amount healed.
            * **Example:** `<Heal>100</Heal>`
        * **`<Radius>`**
            * **Description:** Defines the radius of effect for area-of-effect (AoE) abilities.
            * **Content:** The float value of the radius.
            * **Example:** `<Radius>3</Radius>`
        * **`<Summon type="{objectType}" duration="{seconds}"/>`**
            * **Description:** Summons a temporary minion.
            * **Attributes:**
                * `type`: Hexadecimal ID of the minion object to summon.
                * `duration`: Duration of the summoned minion in seconds.
    * **Example (Invisible effect):**
        ```xml
        <Activate>
            <ConditionEffect effect="Invisible" duration="3"/>
        </Activate>
        ```
    * **Example (Heal with Radius):**
        ```xml
        <Activate>
            <Heal>100</Heal>
            <Radius>3</Radius>
        </Activate>
        ```
    * **Example (Teleport and Decoy):**
        ```xml
        <Activate>
            <Teleport/>
            <Decoy duration="4"/>
        </Activate>
        ```

* **`<Projectile>`**
    * **Description:** A container element that defines the properties of a
        weapon's projectile or an ability's shot.
    * **Child Elements (within `<Projectile>`):**
        * **`<ObjectId>`**
            * **Description:** The internal ID of the projectile's sprite (e.g., `"Arrow"`, `"MagicBolt"`, `"PoisonCloud"`).
            * **Type:** String
        * **`<Speed>`**
            * **Description:** The speed of the projectile in units per second.
            * **Type:** Float
        * **`<MinDamage>` / `<MaxDamage>`**
            * **Description:** The damage range dealt by this projectile. (These override
                the parent `<Object>`'s damage if present here).
            * **Type:** Integer
        * **`<LifetimeMS>`**
            * **Description:** How long the projectile exists before despawning, in milliseconds.
            * **Type:** Integer
        * **`<ConditionEffect effect="{effectName}" duration="{seconds}"/>`**
            * **Description:** (Optional) Applies a status effect to enemies hit by this projectile.
                Same attributes as `<Activate>`'s `ConditionEffect`.
        * **`<NumProjectiles>`**
            * **Description:** Number of projectiles fired simultaneously. If defined
                directly under `<Object>`, it applies to the main attack if no
                `<Projectile>` exists. If defined within `<Projectile>`, it applies
                to this specific projectile's behavior.
            * **Type:** Integer
        * **`<Boomerang/>`**
            * **Description:** (Empty tag) If present, the projectile will return
                to the player after reaching its maximum range.
        * **`<MultiHit/>`**
            * **Description:** (Empty tag) If present, the projectile can hit multiple
                enemies.
        * **`<PassesCover/>`**
            * **Description:** (Empty tag) If present, the projectile will pass
                through obstacles (e.g., walls).
        * **`<PierceDefense/>`**
            * **Description:** (Empty tag) If present, the projectile will ignore
                the defense stat of enemies, dealing true damage.
    * **Example:**
        ```xml
        <Projectile>
            <ObjectId>Arrow</ObjectId>
            <Speed>120</Speed>
            <MinDamage>80</MinDamage>
            <MaxDamage>120</MaxDamage>
            <LifetimeMS>800</LifetimeMS>
            <PassesCover/>
        </Projectile>
        ```

* **`<Tag>`**
    * **Description:** A classification tag used for filtering items, particularly
        in the wiki. Items can have one tag.
    * **Type:** String
    * **Common Values:**
        * `T0`, `T1`, ..., `T14`: Tiered items (T0 is lowest tier, T14 is highest).
        * `UT`: Untiered items (unique items not part of a tier progression).
        * `ST`: Set-piece items (part of an equipment set).
        * `LG`: Legendary items (very rare, powerful unique items).
        * `Event`: Items obtained from special in-game events.
    * **Example:** `<Tag>ST</Tag>`

* **`<Set>`**
    * **Description:** A container element for items that are part of an equipment set.
        This element defines the name of the set and the bonuses granted when
        multiple pieces of the set are equipped.
    * **Attributes:**
        * `name`: The name of the equipment set.
    * **Child Elements (within `<Set>`):**
        * **`<SetBonus pieces="{count}">`**
            * **Description:** Defines a bonus gained when a specific number of set pieces are equipped. Can be
                repeated for different piece counts.
            * **Attributes:**
                * `pieces`: The number of unique set pieces required for this bonus.
            * **Content:** A text description of the stat bonus (e.g., `"+3 DEF, +15 VIT"`).
        * **`<FullSetBonus>`**
            * **Description:** Defines a special bonus gained when all pieces of the set are equipped.
            * **Content:** A text description of the full set bonus.
    * **Example:**
        ```xml
        <Set name="Lost Golem Set">
            <SetBonus pieces="2">+3 DEF, +15 VIT</SetBonus>
            <SetBonus pieces="3">+10 ATT, +5 DEX</SetBonus>
            <SetBonus pieces="4">+40 HP</SetBonus>
            <FullSetBonus>+40 HP, +10 ATT, +3 DEF, +5 DEX, +15 VIT</FullSetBonus>
        </Set>
        ```

---

**IMPORTANT NOTES:**

* Boolean values (`"true"` or `"false"`) should be written in lowercase.
* When an element is optional, omitting it means the item does not have that
    property, or a default behavior is applied by the game.
* Ensure proper XML syntax: all tags must be correctly nested and closed.
* Avoid using the sequence `--` within XML comments (`<!-- -->`) as it can
    cause parsing errors. Use a single hyphen or spaces instead if needed.
