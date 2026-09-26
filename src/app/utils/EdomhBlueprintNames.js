/**
 * Blueprint names used when exporting a build to EDOMH (Elite Dangerous Odyssey
 * Materials Helper).
 *
 * Coriolis hands a build over through a `edomh://coriolis/?...` deeplink. The
 * `blueprint` field of every entry has to be the in-game blueprint internal
 * name, i.e. the value Elite Dangerous writes to `Engineering.BlueprintName`,
 * because EDOMH resolves each entry with
 * `HorizonsBlueprintType.forInternalName(blueprint)`. Any other name makes
 * EDOMH abort with `Unknown blueprint type: <name>` and silently drop the
 * entry, so its materials never reach the EDOMH wishlist.
 *
 * Mercenary ("Merc Coin") modules are bought pre-engineered and the game gives
 * each of them its own internal blueprint name, which is not the `fdname` we
 * keep in coriolis-data: Rapid Phase is `multicannon_rapid` for EDOMH, not
 * `Weapon_RapidPhase`; Overloaded Beam is `beamlaser_overloaded`, not
 * `Weapon_OverloadedBeam`, and so on.
 *
 * A few mercenary variants share a single coriolis-data blueprint across
 * several module sizes (Fragment Cannon small/large, Cargo Rack 5/6 and the
 * Power Distributor sizes), so the lookup key combines the module symbol with
 * the coriolis-data blueprint fdname.
 *
 * The two mining variants (Long Range Mining Laser and Far-Reaching Abrasion
 * Blaster) are listed as well, but EDOMH currently has no module name rule for
 * `hpt_mininglaser` / `hpt_mining_abrblstr`, so those entries still fail on the
 * `item` field before the blueprint name is even looked at. They will start
 * working once EDOMH accepts those two module names.
 *
 * Keep this table in sync with
 * `ed-odyssey-materials-helper` `nl/edomh/core/enums/HorizonsBlueprintType.java`
 * (`forInternalName`), which is the authoritative list of accepted names.
 */
const EDOMH_BLUEPRINT_NAMES = {
  // Abrasion Blaster 1D - Far-Reaching
  'Hpt_Mining_AbrBlstr_Fixed_Small|Weapon_FarReaching': 'abrasionblaster_farreaching',
  // Beam Laser 4A - Overloaded Beam
  'Hpt_BeamLaser_Fixed_Huge|Weapon_OverloadedBeam': 'beamlaser_overloaded',
  // Burst Laser 2F - Regenerative Burst
  'Hpt_PulseLaserBurst_Gimbal_Medium|Weapon_Regenerative': 'burstlaser_regenerative',
  // Cannon 4B - Force Impact
  'Hpt_Cannon_Fixed_Huge|Weapon_ForceImpact': 'cannon_forceimpact',
  // Fragment Cannon 1E / 3C - Double Screaming
  'Hpt_Slugshot_Gimbal_Small|Weapon_DoubleScreaming': 'fragmentcannonsmall_doublescreaming',
  'Hpt_Slugshot_Gimbal_Large|Weapon_DoubleScreaming': 'fragmentcannonlarge_doublescreaming',
  // Mining Laser 1D - Long Range
  'Hpt_MiningLaser_Fixed_Small|Weapon_LongRangeMiningLaser': 'mininglaser_longrange',
  // Seeker Missile Rack 2B / 3A - Lockdown, Lightweight Thermal and Drag
  'Hpt_BasicMissileRack_Fixed_Medium|Weapon_LockdownSeeker': 'seekermissilerackmedium_lockdown',
  'Hpt_BasicMissileRack_Fixed_Large|Weapon_LockdownSeeker': 'seekermissileracklarge_lockdown',
  'Hpt_BasicMissileRack_Fixed_Medium|Weapon_LightweightThermalSeeker': 'seekermissilerack_lightweightthermal',
  'Hpt_BasicMissileRack_Fixed_Medium|Weapon_DragSeeker': 'seekermissilerack_drag',
  // Seeker Missile Rack 3A - Exposing Missiles
  'Hpt_BasicMissileRack_Fixed_Large|Weapon_ExposingSeeker': 'seekermissileracklarge_exposingmissiles',
  // Multi-Cannon 2E - Rapid Phase
  'Hpt_MultiCannon_Fixed_Medium|Weapon_RapidPhase': 'multicannon_rapid',
  // Rail Gun 2B - Enduring Feedback
  'Hpt_Railgun_Fixed_Medium|Weapon_EnduringFeedback': 'railgun_longshot',
  // Cargo Rack 5E / 6E - Extended
  'Int_CargoRack_Size5_Class1|CargoRack_Extended': 'cargoracks5c1_extended',
  'Int_CargoRack_Size6_Class1|CargoRack_Extended': 'cargoracks6c1_extended',
  // Module Reinforcement Package 5D - Heavy Duty
  'Int_ModuleReinforcement_Size5_Class2|MRP_HeavyDuty': 'modulereinforcement_heavyduty',
  // Detailed Surface Scanner 1I - Long Range
  'Int_DetailedSurfaceScanner_Tiny|Sensor_LongRangeDSS': 'detailedsurfacescanner_longrange',
  // Power Distributor 5A - Balanced
  'Int_PowerDistributor_Size5_Class5|PowerDistributor_Balanced': 'powerdistributor_balanced',
  // Power Distributor 3D / 3A / 4D / 4A / 6A - Support Focused
  'Int_PowerDistributor_Size3_Class2|PowerDistributor_SupportFocused': 'powerdistributors3c2_supportfocused',
  'Int_PowerDistributor_Size3_Class5|PowerDistributor_SupportFocused': 'powerdistributors3c5_supportfocused',
  'Int_PowerDistributor_Size4_Class2|PowerDistributor_SupportFocused': 'powerdistributors4c2_supportfocused',
  'Int_PowerDistributor_Size4_Class5|PowerDistributor_SupportFocused': 'powerdistributors4c5_supportfocused',
  'Int_PowerDistributor_Size6_Class5|PowerDistributor_SupportFocused': 'powerdistributors6c5_supportfocused',
};

/**
 * Get the blueprint name EDOMH expects for an engineered module.
 * @param  {String} symbol Module symbol, e.g. `Hpt_MultiCannon_Fixed_Medium`
 * @param  {String} fdname coriolis-data blueprint fdname, e.g. `Weapon_RapidPhase`
 * @return {String} EDOMH blueprint name, or null when no override is needed
 */
export function getEdomhBlueprintName(symbol, fdname) {
  return EDOMH_BLUEPRINT_NAMES[symbol + '|' + fdname] || null;
}
