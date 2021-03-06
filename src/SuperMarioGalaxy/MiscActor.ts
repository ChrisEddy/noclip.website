
// Misc actors that aren't big enough to have their own file.

import { LightType } from './DrawBuffer';
import { SceneObjHolder, getObjectName, getDeltaTimeFrames, getTimeFrames, createSceneObj, SceneObj, SpecialTextureType } from './Main';
import { createCsvParser, JMapInfoIter, getJMapInfoArg0, getJMapInfoArg1, getJMapInfoArg2, getJMapInfoArg3, getJMapInfoArg7, getJMapInfoBool, getJMapInfoGroupId, getJMapInfoArg4, getJMapInfoArg6 } from './JMapInfo';
import { mat4, vec3, vec2, quat } from 'gl-matrix';
import { MathConstants, clamp, lerp, normToLength, clampRange, isNearZeroVec3, computeModelMatrixR, computeModelMatrixS, computeNormalMatrix, invlerp, saturate, getMatrixAxisY, getMatrixAxisZ, getMatrixTranslation, quatFromEulerRadians, isNearZero, Vec3Zero, Vec3UnitX, Vec3UnitZ, Vec3UnitY, transformVec3Mat4w0, computeEulerAngleRotationFromSRTMatrix, getMatrixAxisX, setMatrixTranslation, computeModelMatrixSRT, transformVec3Mat4w1 } from '../MathHelpers';
import { colorNewFromRGBA8, Color, colorCopy, colorNewCopy, colorFromRGBA8, White, Green, Yellow, OpaqueBlack, Red } from '../Color';
import { ColorKind, GXMaterialHelperGfx, MaterialParams, PacketParams, ub_MaterialParams, ub_PacketParams, ub_PacketParamsBufferSize, fillPacketParamsData } from '../gx/gx_render';
import { LoopMode } from '../Common/JSYSTEM/J3D/J3DLoader';
import * as Viewer from '../viewer';
import * as RARC from '../Common/JSYSTEM/JKRArchive';
import { DrawBufferType, MovementType, CalcAnimType, DrawType, NameObj, NameObjAdaptor } from './NameObj';
import { assertExists, leftPad, fallback, nArray, assert } from '../util';
import { Camera } from '../Camera';
import { isGreaterStep, isGreaterEqualStep, isFirstStep, calcNerveRate, isLessStep, calcNerveValue } from './Spine';
import { LiveActor, makeMtxTRFromActor, LiveActorGroup, ZoneAndLayer, dynamicSpawnZoneAndLayer, MessageType, isDead, MsgSharedGroup } from './LiveActor';
import { MapPartsRotator, MapPartsRailMover, getMapPartsArgMoveConditionType, MoveConditionType, MapPartsRailGuideDrawer, getMapPartsArgRailGuideType, RailGuideType } from './MapParts';
import { isConnectedWithRail } from './RailRider';
import { WorldmapPointInfo } from './LegacyActor';
import { isBckStopped, getBckFrameMax, setLoopMode, initDefaultPos, connectToSceneCollisionMapObjStrongLight, connectToSceneCollisionMapObjWeakLight, connectToSceneCollisionMapObj, connectToSceneEnvironmentStrongLight, connectToSceneEnvironment, connectToSceneMapObjNoCalcAnim, connectToSceneEnemyMovement, connectToSceneNoSilhouettedMapObjStrongLight, connectToSceneMapObj, connectToSceneMapObjStrongLight, connectToSceneNpc, connectToSceneCrystal, connectToSceneSky, connectToSceneIndirectNpc, connectToSceneMapObjMovement, connectToSceneAir, connectToSceneNoSilhouettedMapObj, connectToScenePlanet, connectToScene, connectToSceneItem, connectToSceneItemStrongLight, startBrk, setBrkFrameAndStop, startBtk, startBva, isBtkExist, isBtpExist, startBtp, setBtpFrameAndStop, setBtkFrameAndStop, startBpk, startAction, tryStartAllAnim, startBck, setBckFrameAtRandom, setBckRate, getRandomFloat, getRandomInt, isBckExist, tryStartBck, addHitSensorNpc, sendArbitraryMsg, isExistRail, isBckPlaying, startBckWithInterpole, isBckOneTimeAndStopped, getRailPointPosStart, getRailPointPosEnd, calcDistanceVertical, loadBTIData, isValidDraw, getRailPointNum, moveCoordAndTransToNearestRailPos, getRailTotalLength, isLoopRail, moveCoordToStartPos, setRailCoordSpeed, getRailPos, moveRailRider, getRailDirection, moveCoordAndFollowTrans, calcRailPosAtCoord, isRailGoingToEnd, reverseRailDirection, getRailCoord, moveCoord, moveTransToOtherActorRailPos, setRailCoord, calcRailPointPos, startBrkIfExist, calcDistanceToCurrentAndNextRailPoint, setTextureMatrixST, loadTexProjectionMtx, calcGravityVector, calcMtxAxis, makeMtxTRFromQuatVec, getRailCoordSpeed, adjustmentRailCoordSpeed, isRailReachedGoal, tryStartAction, makeMtxUpFrontPos, makeMtxFrontUpPos, setMtxAxisXYZ, blendQuatUpFront, makeQuatUpFront, connectToSceneMapObjDecoration, isSameDirection, moveCoordToEndPos, calcRailStartPointPos, calcRailEndPointPos, calcRailDirectionAtCoord, isAnyAnimStopped, vecKillElement, calcGravity, makeMtxUpNoSupportPos, moveTransToCurrentRailPos, connectToSceneCollisionEnemyStrongLight, setBvaRate, moveCoordToNearestPos, setBckFrameAndStop, getNextRailPointNo, startBckNoInterpole, addBodyMessageSensorMapObj, isExistCollisionResource, initCollisionParts, connectToSceneNoSilhouettedMapObjWeakLightNoMovement, addHitSensorMapObj, useStageSwitchSleep, useStageSwitchReadAppear, syncStageSwitchAppear, useStageSwitchWriteA, useStageSwitchWriteB, listenStageSwitchOnOffA, useStageSwitchWriteDead, listenStageSwitchOnOffAppear, connectToSceneCollisionEnemyNoShadowedMapObjStrongLight, moveCoordAndTransToRailStartPoint, setRailDirectionToEnd, getCurrentRailPointArg0, moveCoordToRailPoint, isValidSwitchDead, isValidSwitchB, isOnSwitchB, listenStageSwitchOnOffB, getJointMtx, getJointMtxByName, calcPerpendicFootToLine, connectToSceneSun, quatSetRotate, getCamPos, hideModel, showModel, isHiddenModel, connectToSceneNoShadowedMapObjStrongLight, joinToGroupArray, connectToSceneEnemy, makeMtxUpFront, connectToSceneMapObjDecorationStrongLight, getBrkFrameMax, connectToSceneNoShadowedMapObj, isValidSwitchAppear, isValidSwitchA, isOnSwitchA, connectToSceneIndirectEnemy, turnQuatYDirRad } from './ActorUtil';
import { isSensorNpc, HitSensor, isSensorPlayer } from './HitSensor';
import { BTIData } from '../Common/JSYSTEM/JUTTexture';
import { TDDraw, TSDraw } from './DDraw';
import * as GX from '../gx/gx_enum';
import { GfxRenderInstManager } from '../gfx/render/GfxRenderer';
import { GfxDevice, GfxBuffer, GfxBufferUsage, GfxInputLayout, GfxInputState, GfxVertexAttributeDescriptor, GfxFormat, GfxInputLayoutBufferDescriptor, GfxVertexBufferFrequency } from '../gfx/platform/GfxPlatform';
import { GXMaterialBuilder } from '../gx/GXMaterialBuilder';
import { TextureMapping } from '../TextureHolder';
import { makeStaticDataBuffer } from '../gfx/helpers/BufferHelpers';
import { getVertexInputLocation } from '../gx/gx_material';
import { getTriangleIndexCountForTopologyIndexCount, GfxTopology } from '../gfx/helpers/TopologyHelpers';
import { buildEnvMtx } from '../Common/JSYSTEM/J3D/J3DGraphBase';
import { isInWater, WaterAreaHolder, WaterInfo } from './MiscMap';
import { getFirstPolyOnLineToMap, calcMapGround, Triangle, getFirstPolyOnLineToMapExceptActor, CollisionParts } from './Collision';
import { VertexAttributeInput } from '../gx/gx_displaylist';
import { isExistStageSwitchSleep } from './Switch';
import { BrightObjBase, BrightObjCheckArg, addBrightObj } from './LensFlare';
import { getDebugOverlayCanvas2D, drawWorldSpacePoint, drawWorldSpaceBasis, drawWorldSpaceVector } from '../DebugJunk';

const materialParams = new MaterialParams();
const packetParams = new PacketParams();

// Scratchpad
const scratchVec3 = vec3.create();
const scratchVec3a = vec3.create();
const scratchVec3b = vec3.create();
const scratchVec3c = vec3.create();
const scratchVec2 = vec2.create();
const scratchMatrix = mat4.create();
const scratchQuat = quat.create();
const scratchColor = colorNewCopy(White);

export function createModelObjBloomModel(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, objName: string, modelName: string, baseMtx: mat4): ModelObj {
    const bloomModel = new ModelObj(zoneAndLayer, sceneObjHolder, objName, modelName, baseMtx, DrawBufferType.BLOOM_MODEL, -2, -2);
    return bloomModel;
}

export function createModelObjMapObj(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, objName: string, modelName: string, baseMtx: mat4): ModelObj {
    return new ModelObj(zoneAndLayer, sceneObjHolder, objName, modelName, baseMtx, 0x08, -2, -2);
}

export function emitEffect(sceneObjHolder: SceneObjHolder, actor: LiveActor, name: string): void {
    if (actor.effectKeeper === null)
        return;
    actor.effectKeeper.createEmitter(sceneObjHolder, name);
}

export function isEffectValid(actor: LiveActor, name: string): boolean {
    if (actor.effectKeeper === null)
        return false;
    const multiEmitter = actor.effectKeeper.getEmitter(name);
    if (multiEmitter !== null)
        return multiEmitter.isValid();
    else
        return false;
}

export function emitEffectWithScale(sceneObjHolder: SceneObjHolder, actor: LiveActor, name: string, scale: number): void {
    if (actor.effectKeeper === null)
        return;
    const emitter = actor.effectKeeper.createEmitter(sceneObjHolder, name);
    vec3.set(scratchVec3, scale, scale, scale);
    emitter!.setGlobalScale(scratchVec3);
}

export function setEffectColor(actor: LiveActor, name: string, prmColor: Color, envColor: Color): void {
    if (actor.effectKeeper === null)
        return;
    const emitter = assertExists(actor.effectKeeper.getEmitter(name));
    emitter.setGlobalPrmColor(prmColor, -1);
    emitter.setGlobalEnvColor(envColor, -1);
}

export function setEffectEnvColor(actor: LiveActor, name: string, color: Color): void {
    if (actor.effectKeeper === null)
        return;
    const emitter = assertExists(actor.effectKeeper.getEmitter(name));
    emitter.setGlobalEnvColor(color, -1);
}

export function deleteEffect(sceneObjHolder: SceneObjHolder, actor: LiveActor, name: string): void {
    if (actor.effectKeeper === null)
        return;
    actor.effectKeeper.deleteEmitter(sceneObjHolder, name);
}

export function forceDeleteEffect(sceneObjHolder: SceneObjHolder, actor: LiveActor, name: string): void {
    if (actor.effectKeeper === null)
        return;
    actor.effectKeeper.forceDeleteEmitter(sceneObjHolder, name);
}

export function deleteEffectAll(actor: LiveActor): void {
    if (actor.effectKeeper === null)
        return;
    actor.effectKeeper.deleteEmitterAll();
}

export function isRegisteredEffect(actor: LiveActor, name: string): boolean {
    if (actor.effectKeeper === null)
        return false;
    return actor.effectKeeper.isRegisteredEmitter(name);
}

export function hideMaterial(actor: LiveActor, materialName: string): void {
    const materialInstance = assertExists(actor.modelInstance!.materialInstances.find((m) => m.materialData.material.name === materialName));
    materialInstance.visible = false;
}

export function calcActorAxis(axisX: vec3 | null, axisY: vec3 | null, axisZ: vec3 | null, actor: LiveActor): void {
    const m = scratchMatrix;
    makeMtxTRFromActor(m, actor);
    calcMtxAxis(axisX, axisY, axisZ, m);
}

export function calcUpVec(v: vec3, actor: LiveActor): void {
    getMatrixAxisY(v, assertExists(actor.getBaseMtx()));
}

export function calcFrontVec(v: vec3, actor: LiveActor): void {
    getMatrixAxisZ(v, assertExists(actor.getBaseMtx()));
}

export function calcMtxFromGravityAndZAxis(dst: mat4, actor: LiveActor, gravityVec: vec3, front: vec3): void {
    vec3.negate(scratchVec3b, gravityVec);
    makeMtxUpFrontPos(dst, scratchVec3b, front, actor.translation);
}

export function getCamYdir(v: vec3, camera: Camera): void {
    getMatrixAxisY(v, camera.worldMatrix);
}

export function getCamZdir(v: vec3, camera: Camera): void {
    getMatrixAxisZ(v, camera.worldMatrix);
    v[2] *= -1;
}

export function calcDistToCamera(actor: LiveActor, camera: Camera, scratch: vec3 = scratchVec3): number {
    getCamPos(scratch, camera);
    return vec3.distance(actor.translation, scratch);
}

export function calcSqDistanceToPlayer(actor: LiveActor, camera: Camera, scratch: vec3 = scratchVec3): number {
    getCamPos(scratch, camera);
    return vec3.squaredDistance(actor.translation, scratch);
}

export function calcDistanceToPlayer(actor: LiveActor, camera: Camera, scratch: vec3 = scratchVec3): number {
    return calcDistToCamera(actor, camera, scratch);
}

export function isNearPlayer(sceneObjHolder: SceneObjHolder, actor: LiveActor, radius: number): boolean {
    return calcDistanceToPlayer(actor, sceneObjHolder.viewerInput.camera) <= radius;
}

export function getJointNum(actor: LiveActor): number {
    return actor.modelInstance!.shapeInstanceState.jointToWorldMatrixArray.length;
}

export function scaleMatrixScalar(m: mat4, s: number): void {
    m[0] *= s;
    m[4] *= s;
    m[8] *= s;
    m[1] *= s;
    m[5] *= s;
    m[9] *= s;
    m[2] *= s;
    m[6] *= s;
    m[10] *= s;
}

function getEaseInValue(v0: number, v1: number, v2: number, v3: number): number {
    const t = Math.cos((v0 / v3) * Math.PI * 0.5);
    return lerp(v1, v2, 1 - t);
}

function getEaseOutValue(v0: number, v1: number, v2: number, v3: number): number {
    const t = Math.sin((v0 / v3) * Math.PI * 0.5);
    return lerp(v1, v2, t);
}

function getEaseInOutValue(v0: number, v1: number, v2: number, v3: number): number {
    const t = Math.cos((v0 / v3) * Math.PI);
    return lerp(v1, v2, 0.5 * (1 - t));
}

function getRandomVector(dst: vec3, range: number): void {
    vec3.set(dst, getRandomFloat(-range, range), getRandomFloat(-range, range), getRandomFloat(-range, range));
}

function rotateVecDegree(dst: vec3, upVec: vec3, degrees: number, m: mat4 = scratchMatrix): void {
    const theta = degrees * MathConstants.DEG_TO_RAD;
    mat4.fromRotation(m, theta, upVec);
    vec3.transformMat4(dst, dst, m);
}

// ClippingJudge has these distances.
const clippingJudgeDistances = [
    -1, 60000, 50000, 40000, 30000, 20000, 10000, 5000,
];

// Mapping from "far clipping" values to the actual distances.
function setClippingFar(f: number): number {
    if (f === -1)
        return 0;
    if (f === 50)
        return 7;
    if (f === 100)
        return 6;
    if (f === 200)
        return 5;
    if (f === 300)
        return 4;
    if (f === 400)
        return 3;
    if (f === 500)
        return 2;
    if (f === 600)
        return 1;
    throw "whoops";
}

export function isEqualStageName(sceneObjHolder: SceneObjHolder, stageName: string): boolean {
    return sceneObjHolder.scenarioData.getMasterZoneFilename() === stageName;
}

function isHalfProbability(): boolean {
    return Math.random() >= 0.5;
}

function mod(a: number, b: number): number {
    return (a + b) % b;
}

function createSubModelObjName(parentActor: LiveActor, suffix: string): string {
    return `${parentActor.name}${suffix}`;
}

function createSubModel(sceneObjHolder: SceneObjHolder, parentActor: LiveActor, suffix: string, drawBufferType: DrawBufferType): PartsModel | null {
    const subModelObjName = createSubModelObjName(parentActor, suffix);
    if (!sceneObjHolder.modelCache.isObjectDataExist(subModelObjName))
        return null;
    const model = new PartsModel(sceneObjHolder, subModelObjName, subModelObjName, parentActor, drawBufferType);
    model.initFixedPositionRelative(null);
    tryStartAllAnim(model, subModelObjName);
    return model;
}

function createWaterModel(sceneObjHolder: SceneObjHolder, parentActor: LiveActor) {
    const model = createSubModel(sceneObjHolder, parentActor, 'Water', DrawBufferType.MAP_OBJ);
    return model;
}

function createIndirectPlanetModel(sceneObjHolder: SceneObjHolder, parentActor: LiveActor) {
    const model = createSubModel(sceneObjHolder, parentActor, 'Indirect', DrawBufferType.INDIRECT_PLANET);
    return model;
}

function createPartsModelIndirectNpc(sceneObjHolder: SceneObjHolder, parentActor: LiveActor, objName: string, jointName: string, localTrans: vec3 | null = null) {
    const model = new PartsModel(sceneObjHolder, "npc parts", objName, parentActor, DrawBufferType.INDIRECT_NPC);
    model.initFixedPositionJoint(jointName, localTrans);
    return model;
}

function createIndirectNPCGoods(sceneObjHolder: SceneObjHolder, parentActor: LiveActor, objName: string, jointName: string, localTrans: vec3 | null = null) {
    const model = createPartsModelIndirectNpc(sceneObjHolder, parentActor, objName, jointName, localTrans);
    model.initLightCtrl(sceneObjHolder);
    return model;
}

function createPartsModelNpcAndFix(sceneObjHolder: SceneObjHolder, parentActor: LiveActor, objName: string, jointName: string, localTrans: vec3 | null = null) {
    const model = new PartsModel(sceneObjHolder, "npc parts", objName, parentActor, DrawBufferType.NPC);
    model.initFixedPositionJoint(jointName, localTrans);
    return model;
}

function createPartsModelMapObj(sceneObjHolder: SceneObjHolder, parentActor: LiveActor, objName: string, localTrans: vec3 | null = null) {
    const model = new PartsModel(sceneObjHolder, objName, objName, parentActor, DrawBufferType.MAP_OBJ);
    model.initFixedPositionRelative(localTrans);
    return model;
}

function createPartsModelNoSilhouettedMapObj(sceneObjHolder: SceneObjHolder, parentActor: LiveActor, objName: string, localTrans: vec3 | null = null) {
    const model = new PartsModel(sceneObjHolder, objName, objName, parentActor, DrawBufferType.NO_SILHOUETTED_MAP_OBJ);
    model.initFixedPositionRelative(localTrans);
    return model;
}

function createNPCGoods(sceneObjHolder: SceneObjHolder, parentActor: LiveActor, objName: string, jointName: string) {
    const model = createPartsModelNpcAndFix(sceneObjHolder, parentActor, objName, jointName);
    model.initLightCtrl(sceneObjHolder);
    return model;
}

function requestArchivesForNPCGoods(sceneObjHolder: SceneObjHolder, npcName: string, index: number): void {
    const modelCache = sceneObjHolder.modelCache;

    const itemGoods = sceneObjHolder.npcDirector.getNPCItemData(npcName, index);
    if (itemGoods !== null) {
        if (itemGoods.goods0)
            modelCache.requestObjectData(itemGoods.goods0);

        if (itemGoods.goods1)
            modelCache.requestObjectData(itemGoods.goods1);
    }
}

function setupInitInfoSimpleMapObj(initInfo: MapObjActorInitInfo): void {
    initInfo.setDefaultPos = true;
    initInfo.connectToScene = true;
    initInfo.initEffect = true;
    initInfo.effectFilename = null;
}

function setupInitInfoTypical(initInfo: MapObjActorInitInfo, objName: string): void {
    // Special cases go here.
}

function setupInitInfoColorChangeArg0(initInfo: MapObjActorInitInfo, infoIter: JMapInfoIter): void {
    initInfo.colorChangeFrame = fallback(getJMapInfoArg0(infoIter), -1);
}

function setupInitInfoTextureChangeArg1(initInfo: MapObjActorInitInfo, infoIter: JMapInfoIter): void {
    initInfo.texChangeFrame = fallback(getJMapInfoArg1(infoIter), -1);
}

function setupInitInfoPlanet(initInfo: MapObjActorInitInfo): void {
    initInfo.setDefaultPos = true;
    initInfo.connectToScene = true;
    initInfo.initEffect = true;
    initInfo.effectFilename = null;
}

class MapObjActorInitInfo<TNerve extends number = number> {
    public lightType: LightType = LightType.Planet;
    public initLightControl: boolean = false;
    public connectToScene: boolean = false;
    public setDefaultPos: boolean = true;
    public modelName: string | null = null;
    public initEffect: boolean = false;
    public effectFilename: string | null = null;
    public colorChangeFrame: number = -1;
    public texChangeFrame: number = -1;
    public rotator: boolean = false;
    public railMover: boolean = false;
    public initNerve: TNerve | null = null;
    public initHitSensor: boolean = false;

    public setupDefaultPos(): void {
        this.setDefaultPos = true;
    }

    public setupConnectToScene(): void {
        this.connectToScene = true;
    }

    public setupModelName(name: string): void {
        this.modelName = name;
    }

    public setupEffect(name: string | null): void {
        this.initEffect = true;
        this.effectFilename = name;
    }

    public setupRotator(): void {
        this.rotator = true;
    }

    public setupRailMover(): void {
        this.railMover = true;
    }

    public setupNerve(nerve: TNerve): void {
        this.initNerve = nerve;
    }
}

class MapObjActor<TNerve extends number = number> extends LiveActor<TNerve> {
    private bloomModel: ModelObj | null = null;
    private objName: string;
    protected rotator: MapPartsRotator | null = null;
    protected railMover: MapPartsRailMover | null = null;
    protected railGuideDrawer: MapPartsRailGuideDrawer | null = null;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter, initInfo: MapObjActorInitInfo) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        this.objName = this.name;
        if (initInfo.modelName !== null)
            this.objName = initInfo.modelName;

        if (initInfo.setDefaultPos)
            initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, this.objName);
        if (initInfo.connectToScene)
            this.connectToScene(sceneObjHolder, initInfo);
        if (initInfo.initLightControl)
            this.initLightCtrl(sceneObjHolder);
        if (initInfo.initEffect !== null)
            this.initEffectKeeper(sceneObjHolder, initInfo.effectFilename);
        if (initInfo.initNerve !== null)
            this.initNerve(initInfo.initNerve as TNerve);

        if (isExistCollisionResource(this, this.objName)) {
            if (!initInfo.initHitSensor) {
                this.initHitSensor();
                addBodyMessageSensorMapObj(sceneObjHolder, this);
            }

            let hostMtx: mat4 | null = null;
            // TODO(jstpierre): Follow joint

            const bodySensor = this.getSensor('body')!;
            initCollisionParts(sceneObjHolder, this, this.objName, bodySensor, hostMtx);
            // TODO(jstpierre): MoveLimit
        }

        const connectedWithRail = isConnectedWithRail(infoIter);
        if (connectedWithRail)
            this.initRailRider(sceneObjHolder, infoIter);
        if (connectedWithRail && initInfo.railMover)
            this.railMover = new MapPartsRailMover(sceneObjHolder, this, infoIter);
        if (initInfo.rotator)
            this.rotator = new MapPartsRotator(sceneObjHolder, this, infoIter);

        if (connectedWithRail) {
            const guideType = fallback(getMapPartsArgRailGuideType(this), RailGuideType.None);
            if (guideType !== RailGuideType.None) {
                sceneObjHolder.create(SceneObj.MapPartsRailGuideHolder);
                this.railGuideDrawer = sceneObjHolder.mapPartsRailGuideHolder!.createRailGuide(sceneObjHolder, this, 'RailPoint', infoIter);
            }
        }

        tryStartAllAnim(this, this.objName);
        if (initInfo.colorChangeFrame !== -1) {
            startBrk(this, 'ColorChange');
            setBrkFrameAndStop(this, initInfo.colorChangeFrame);
        }

        if (initInfo.texChangeFrame !== -1) {
            if (isBtpExist(this, 'TexChange')) {
                startBtp(this, 'TexChange');
                setBtpFrameAndStop(this, initInfo.texChangeFrame);
            }

            if (isBtkExist(this, 'TexChange')) {
                startBtk(this, 'TexChange');
                setBtkFrameAndStop(this, initInfo.texChangeFrame);
            }
        }

        const bloomObjName = `${this.objName}Bloom`;
        if (sceneObjHolder.modelCache.isObjectDataExist(bloomObjName)) {
            this.bloomModel = createModelObjBloomModel(zoneAndLayer, sceneObjHolder, this.name, bloomObjName, this.modelInstance!.modelMatrix);
        }

        this.makeActorAppeared(sceneObjHolder);

        if (useStageSwitchWriteA(sceneObjHolder, this, infoIter))
            this.initCaseUseSwitchA(sceneObjHolder, infoIter);
        else
            this.initCaseNoUseSwitchA(sceneObjHolder, infoIter);

        if (useStageSwitchWriteB(sceneObjHolder, this, infoIter))
            this.initCaseUseSwitchB(sceneObjHolder, infoIter);
        else
            this.initCaseNoUseSwitchB(sceneObjHolder, infoIter);

        // useStageSwitchWriteDead

        if (useStageSwitchReadAppear(sceneObjHolder, this, infoIter)) {
            syncStageSwitchAppear(sceneObjHolder, this);
            this.makeActorDead(sceneObjHolder);
        }

        useStageSwitchSleep(sceneObjHolder, this, infoIter);
    }

    public makeActorAppeared(sceneObjHolder: SceneObjHolder): void {
        super.makeActorAppeared(sceneObjHolder);
        if (this.bloomModel !== null)
            this.bloomModel.makeActorAppeared(sceneObjHolder);
    }

    public makeActorDead(sceneObjHolder: SceneObjHolder): void {
        super.makeActorDead(sceneObjHolder);
        if (this.bloomModel !== null)
            this.bloomModel.makeActorDead(sceneObjHolder);
    }

    protected connectToScene(sceneObjHolder: SceneObjHolder, initInfo: MapObjActorInitInfo): void {
        // Default implementation.
        if (initInfo.lightType === LightType.Strong)
            connectToSceneCollisionMapObjStrongLight(sceneObjHolder, this);
        else if (initInfo.lightType === LightType.Weak)
            connectToSceneCollisionMapObjWeakLight(sceneObjHolder, this);
        else
            connectToSceneCollisionMapObj(sceneObjHolder, this);
    }

    protected initCaseUseSwitchA(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
    }

    protected initCaseUseSwitchB(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        // TODO(jstpierre): Switch B
    }

    protected initCaseNoUseSwitchA(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
    }

    protected initCaseNoUseSwitchB(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        this.startMapPartsFunctions(sceneObjHolder);
    }

    public isObjectName(name: string): boolean {
        return this.objName === name;
    }

    public startMapPartsFunctions(sceneObjHolder: SceneObjHolder): void {
        if (this.rotator !== null)
            this.rotator.start();
        if (this.railMover !== null)
            this.railMover.start();
        if (this.railGuideDrawer !== null)
            this.railGuideDrawer.start(sceneObjHolder);
    }

    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.control(sceneObjHolder, viewerInput);

        if (this.rotator !== null)
            this.rotator.movement(sceneObjHolder, viewerInput);
        if (this.railMover !== null)
            this.railMover.movement(sceneObjHolder, viewerInput);
        if (this.railGuideDrawer !== null)
            this.railGuideDrawer.movement(sceneObjHolder, viewerInput);
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        const hasAnyMapFunction = (
            (this.rotator !== null && this.rotator.isWorking())
        );

        if (hasAnyMapFunction) {
            const m = this.modelInstance!.modelMatrix;
            mat4.identity(m);

            if (this.rotator !== null && this.rotator.isWorking())
                mat4.mul(m, m, this.rotator.mtx);
            if (this.railMover !== null && this.railMover.isWorking())
                mat4.mul(m, m, this.railMover.mtx);

            setMatrixTranslation(m, this.translation);
        } else {
            super.calcAndSetBaseMtx(sceneObjHolder, viewerInput);
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);

        // Always request the rail guide if we're connected with a rail.
        if (isConnectedWithRail(infoIter)) {
            sceneObjHolder.modelCache.requestObjectData('RailPoint');
        }
    }
}

export class SimpleMapObj extends MapObjActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo();
        setupInitInfoSimpleMapObj(initInfo);
        setupInitInfoTypical(initInfo, getObjectName(infoIter));
        setupInitInfoColorChangeArg0(initInfo, infoIter);
        setupInitInfoTextureChangeArg1(initInfo, infoIter);
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);
    }
}

export class SimpleEnvironmentObj extends MapObjActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo();
        setupInitInfoSimpleMapObj(initInfo);
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);
    }

    protected connectToScene(sceneObjHolder: SceneObjHolder, initInfo: MapObjActorInitInfo): void {
        // Default implementation.
        if (initInfo.lightType === LightType.Strong)
            connectToSceneEnvironmentStrongLight(sceneObjHolder, this);
        else
            connectToSceneEnvironment(sceneObjHolder, this);
    }
}

export class ModelObj extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, objName: string, modelName: string, private transformMatrix: mat4 | null, drawBufferType: DrawBufferType, movementType: MovementType, calcAnimType: CalcAnimType) {
        super(zoneAndLayer, sceneObjHolder, objName);
        this.initModelManagerWithAnm(sceneObjHolder, modelName);
        if (this.transformMatrix !== null)
            mat4.getTranslation(this.translation, this.transformMatrix);
        if (movementType < -1)
            movementType = 0x08;
        if (calcAnimType < -1)
            calcAnimType = 0x23;
        if (drawBufferType < -1)
            drawBufferType = DrawBufferType.NO_SHADOWED_MAP_OBJ;
        connectToScene(sceneObjHolder, this, movementType, calcAnimType, drawBufferType, -1);
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        if (this.transformMatrix !== null) {
            mat4.getTranslation(this.translation, this.transformMatrix);
            mat4.copy(this.modelInstance!.modelMatrix, this.transformMatrix);
        } else {
            super.calcAndSetBaseMtx(sceneObjHolder, viewerInput);
        }
    }
}

export class RotateMoveObj extends MapObjActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo();
        setupInitInfoSimpleMapObj(initInfo);
        initInfo.setupRotator();
        setupInitInfoTypical(initInfo, getObjectName(infoIter));
        setupInitInfoColorChangeArg0(initInfo, infoIter);
        setupInitInfoTextureChangeArg1(initInfo, infoIter);
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);

        const moveConditionType = getMapPartsArgMoveConditionType(infoIter);
        const startRotating = (moveConditionType === MoveConditionType.Unconditionally);
        // TODO(jstpierre): Also check SwitchB

        if (startRotating)
            this.startMapPartsFunctions(sceneObjHolder);
    }
}

const enum RailMoveObjNrv { Move, Done, WaitForPlayerOn }

export class RailMoveObj extends MapObjActor<RailMoveObjNrv> {
    private isWorking: boolean;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo();
        initInfo.setupDefaultPos();
        initInfo.setupConnectToScene();
        initInfo.setupEffect(null);
        initInfo.setupRailMover();
        // initInfo.setupRailPosture();
        // initInfo.setupBaseMtxFollowTarget();
        initInfo.setupNerve(RailMoveObjNrv.Move);
        setupInitInfoTypical(initInfo, getObjectName(infoIter));

        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);

        this.isWorking = false;

        if (!isConnectedWithRail(infoIter))
            this.setNerve(RailMoveObjNrv.Done);

        const moveConditionType = getMapPartsArgMoveConditionType(infoIter);
        if (moveConditionType === MoveConditionType.WaitForPlayerOn)
            this.setNerve(RailMoveObjNrv.WaitForPlayerOn);
    }

    private startMoveInner(): void {
        // this.tryStageEffectStart();
        if (isBckExist(this, `Move`))
            startBck(this, `Move`);
    }

    public receiveMessage(sceneObjHolder: SceneObjHolder, msgType: MessageType, thisSensor: HitSensor | null, otherSensor: HitSensor | null): boolean {
        if (msgType === MessageType.MapPartsRailMover_Vanish && this.getCurrentNerve() === RailMoveObjNrv.Move) {
            this.makeActorDead(sceneObjHolder);
            return true;
        }

        return super.receiveMessage(sceneObjHolder, msgType, thisSensor, otherSensor);
    }

    protected move(): void {
        // this.tryStageEffectMoving();
    }

    protected doAtEndPoint(): void {
        // stop bck
    }

    protected endMove(): boolean {
        this.doAtEndPoint();
        return true;
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: RailMoveObjNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === RailMoveObjNrv.Move) {
            if (isFirstStep(this))
                this.startMapPartsFunctions(sceneObjHolder);

            const isWorking = this.railMover!.isWorking();
            if (!this.isWorking && isWorking)
                this.startMoveInner();

            this.isWorking = isWorking;
            this.move();

            if (this.railMover!.isReachedEnd()) {
                if (!this.railMover!.isDone() || !this.endMove())
                    this.doAtEndPoint();
                else
                    this.setNerve(RailMoveObjNrv.Done);
            }
        }
    }
}

export class PlanetMap extends LiveActor {
    private bloomModel: ModelObj | null = null;
    private waterModel: PartsModel | null = null;
    private indirectModel: PartsModel | null = null;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModel(sceneObjHolder, this.name, infoIter);
        connectToScenePlanet(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, null);
        this.initHitSensor();
        addBodyMessageSensorMapObj(sceneObjHolder, this);
        const bodySensor = this.getSensor('body')!;
        if (isExistCollisionResource(this, this.name)) {
            let hostMtx: mat4 | null = null;
            // TODO(jstpierre): FollowJoint
            initCollisionParts(sceneObjHolder, this, this.name, bodySensor, hostMtx);
        }
        tryStartAllAnim(this, this.name);
        this.tryStartMyEffect(sceneObjHolder);

        this.makeActorAppeared(sceneObjHolder);
    }

    private initModel(sceneObjHolder: SceneObjHolder, name: string, infoIter: JMapInfoIter): void {
        this.initModelManagerWithAnm(sceneObjHolder, this.name);
        this.initBloomModel(sceneObjHolder, name);

        this.waterModel = createWaterModel(sceneObjHolder, this);
        this.indirectModel = createIndirectPlanetModel(sceneObjHolder, this);
    }

    private initBloomModel(sceneObjHolder: SceneObjHolder, name: string): void {
        const bloomModelName = `${name}Bloom`;
        if (sceneObjHolder.modelCache.isObjectDataExist(bloomModelName)) {
            this.bloomModel = createModelObjBloomModel(this.zoneAndLayer, sceneObjHolder, this.name, bloomModelName, this.getBaseMtx()!);
            vec3.copy(this.bloomModel.scale, this.scale);
        }
    }

    private tryStartMyEffect(sceneObjHolder: SceneObjHolder): void {
        if (this.effectKeeper === null)
            return;

        // In SMG1, this appears to just start the object name as the emitter.
        emitEffect(sceneObjHolder, this, this.name);

        // In SMG2, this hasn't been confirmed in source, but it seems to try to start numbered emitters.
        for (let i = 0; i < this.effectKeeper.multiEmitters.length; i++)
            emitEffect(sceneObjHolder, this, `${this.name}${leftPad(''+i, 2, '0')}`);
    }
}

export class RailPlanetMap extends PlanetMap {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, infoIter);
        this.initRailRider(sceneObjHolder, infoIter);
    }
}

class NPCActorItem {
    public goods0: string = "";
    public goods1: string = "";
    public goodsJoint0: string = "";
    public goodsJoint1: string = "";
}

export class NPCDirector {
    private scratchNPCActorItem = new NPCActorItem();

    constructor(private npcDataArc: RARC.JKRArchive) {
    }

    public getNPCItemData(npcName: string, index: number, npcActorItem = this.scratchNPCActorItem): NPCActorItem | null {
        if (index === -1)
            return null;

        const infoIter = createCsvParser(this.npcDataArc.findFileData(`${npcName}Item.bcsv`)!);
        infoIter.setRecord(index);
        npcActorItem.goods0 = assertExists(infoIter.getValueString('mGoods0'));
        npcActorItem.goods1 = assertExists(infoIter.getValueString('mGoods1'));
        npcActorItem.goodsJoint0 = assertExists(infoIter.getValueString('mGoodsJoint0'));
        npcActorItem.goodsJoint1 = assertExists(infoIter.getValueString('mGoodsJoint1'));
        return npcActorItem;
    }
}

class NPCActor<TNerve extends number = number> extends LiveActor<TNerve> {
    public goods0: PartsModel | null = null;
    public goods1: PartsModel | null = null;

    public lastRotation = vec3.create();
    public poseQuat = quat.create();

    public waitAction: string | null = null;
    public walkAction: string | null = null;
    public desiredRailSpeed: number = 2.0;
    public maxChangeRailSpeed: number = 0.1;
    public railTurnSpeed: number = 0.08;
    public turnBckRate = 1.0;
    public railGrounded: boolean = false;

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        if (!vec3.equals(this.rotation, this.lastRotation)) {
            quatFromEulerRadians(this.poseQuat, this.rotation[0], this.rotation[1], this.rotation[2]);
            vec3.copy(this.lastRotation, this.rotation);
        }

        makeMtxTRFromActor(this.modelInstance!.modelMatrix, this);
        makeMtxTRFromQuatVec(this.modelInstance!.modelMatrix, this.poseQuat, this.translation);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        super.initAfterPlacement(sceneObjHolder);

        calcGravity(sceneObjHolder, this);
        if (this.waitAction !== null) {
            startAction(this, this.waitAction);
            if (isBckExist(this, this.waitAction))
                startBckNoInterpole(this, this.waitAction);
            setBckFrameAtRandom(this);
            this.calcAndSetBaseMtx(sceneObjHolder, null!);
        }
    }

    protected equipment(sceneObjHolder: SceneObjHolder, itemGoods: NPCActorItem | null, isIndirect: boolean = false): void {
        if (itemGoods !== null) {
            if (isIndirect) {
                if (itemGoods.goods0)
                    this.goods0 = createNPCGoods(sceneObjHolder, this, itemGoods.goods0, itemGoods.goodsJoint0);
                if (itemGoods.goods1)
                    this.goods1 = createNPCGoods(sceneObjHolder, this, itemGoods.goods1, itemGoods.goodsJoint1);
            } else {
                if (itemGoods.goods0)
                    this.goods0 = createIndirectNPCGoods(sceneObjHolder, this, itemGoods.goods0, itemGoods.goodsJoint0);
                if (itemGoods.goods1)
                    this.goods1 = createIndirectNPCGoods(sceneObjHolder, this, itemGoods.goods1, itemGoods.goodsJoint1);
            }
        }
    }

    public makeActorAppeared(sceneObjHolder: SceneObjHolder): void {
        super.makeActorAppeared(sceneObjHolder);
        if (this.goods0 !== null)
            this.goods0.makeActorAppeared(sceneObjHolder);
        if (this.goods1 !== null)
            this.goods1.makeActorAppeared(sceneObjHolder);
    }

    public makeActorDead(sceneObjHolder: SceneObjHolder): void {
        super.makeActorDead(sceneObjHolder);
        if (this.goods0 !== null)
            this.goods0.makeActorDead(sceneObjHolder);
        if (this.goods1 !== null)
            this.goods1.makeActorDead(sceneObjHolder);
    }
}

class FixedPosition {
    public transformMatrix = mat4.create();
    private localTrans = vec3.create();

    constructor(private baseMtx: mat4, localTrans: vec3 | null = null) {
        if (localTrans !== null)
            this.setLocalTrans(localTrans);
    }

    public setLocalTrans(localTrans: vec3): void {
        vec3.copy(this.localTrans, localTrans);
    }

    public calc(): void {
        mat4.copy(this.transformMatrix, this.baseMtx);
        mat4.translate(this.transformMatrix, this.transformMatrix, this.localTrans);
    }
}

class PartsModel extends LiveActor {
    public fixedPosition: FixedPosition | null = null;
    public transformMatrix: mat4 | null = null;

    constructor(sceneObjHolder: SceneObjHolder, objName: string, modelName: string, private parentActor: LiveActor, drawBufferType: DrawBufferType, transformMatrix: mat4 | null = null) {
        super(parentActor.zoneAndLayer, sceneObjHolder, objName);
        this.initModelManagerWithAnm(sceneObjHolder, modelName);
        this.initEffectKeeper(sceneObjHolder, null);

        let movementType: MovementType = 0x2B;
        let calcAnimType: CalcAnimType = 0x0B;
        if (drawBufferType >= 0x15 && drawBufferType <= 0x18) {
            movementType = 0x26;
            calcAnimType = 0x0A;
        } else if (drawBufferType === 0x10 || drawBufferType === 0x1B) {
            movementType = 0x28;
            calcAnimType = 0x06;
        }

        this.transformMatrix = transformMatrix;

        connectToScene(sceneObjHolder, this, movementType, calcAnimType, drawBufferType, -1);
    }

    public initFixedPositionRelative(localTrans: vec3 | null): void {
        this.fixedPosition = new FixedPosition(this.parentActor.modelInstance!.modelMatrix, localTrans);
        this.transformMatrix = this.fixedPosition.transformMatrix;
    }

    public initFixedPositionJoint(jointName: string, localTrans: vec3 | null): void {
        this.fixedPosition = new FixedPosition(getJointMtxByName(this.parentActor, jointName)!, localTrans);
        this.transformMatrix = this.fixedPosition.transformMatrix;
    }

    public calcAnim(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        if (this.fixedPosition !== null)
            this.fixedPosition.calc();

        super.calcAnim(sceneObjHolder, viewerInput);
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        if (this.transformMatrix !== null) {
            getMatrixTranslation(this.translation, this.transformMatrix);
            mat4.copy(this.modelInstance!.modelMatrix, this.transformMatrix);
        } else {
            super.calcAndSetBaseMtx(sceneObjHolder, viewerInput);
        }
    }
}

export class CollapsePlane extends MapObjActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo();
        initInfo.setupConnectToScene();
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);
    }
}

const starPieceColorTable = [
    colorNewFromRGBA8(0x7F7F00FF),
    colorNewFromRGBA8(0x800099FF),
    colorNewFromRGBA8(0xE7A000FF),
    colorNewFromRGBA8(0x46A108FF),
    colorNewFromRGBA8(0x375AA0FF),
    colorNewFromRGBA8(0xBE330BFF),
    colorNewFromRGBA8(0x808080FF),
];

function checkPass(old: number, new_: number, thresh: number): boolean {
    return old < thresh && new_ >= thresh;
}

const enum StarPieceNrv { Floating, RailMove }

export class StarPiece extends LiveActor<StarPieceNrv> {
    private type: number = 0;
    private effectCounter: number = 0;
    private effectPrmColor: Color;
    private effectEnvColor: Color;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter | null) {
        super(zoneAndLayer, sceneObjHolder, 'StarPiece');

        let starPieceColorIndex: number = -1;

        if (infoIter !== null) {
            initDefaultPos(sceneObjHolder, this, infoIter);
            starPieceColorIndex = fallback(getJMapInfoArg3(infoIter), -1);
        }

        this.initModelManagerWithAnm(sceneObjHolder, this.name);
        connectToSceneNoSilhouettedMapObj(sceneObjHolder, this);

        if (starPieceColorIndex < 0 || starPieceColorIndex > 5)
            starPieceColorIndex = getRandomInt(1, 7);

        const color = starPieceColorTable[starPieceColorIndex];
        this.effectPrmColor = colorNewCopy(color);
        this.effectPrmColor.r = saturate(this.effectPrmColor.r + 0xFF/0xFF);
        this.effectPrmColor.g = saturate(this.effectPrmColor.g + 0xFF/0xFF);
        this.effectPrmColor.b = saturate(this.effectPrmColor.b + 0xFF/0xFF);

        this.effectEnvColor = colorNewCopy(color);
        this.effectEnvColor.r = saturate(this.effectEnvColor.r + 0x20/0xFF);
        this.effectEnvColor.g = saturate(this.effectEnvColor.g + 0x20/0xFF);
        this.effectEnvColor.b = saturate(this.effectEnvColor.b + 0x20/0xFF);

        this.modelInstance!.setColorOverride(ColorKind.MAT0, color);
        this.initEffectKeeper(sceneObjHolder, 'StarPiece');

        if (this.type === 2) {
            this.initNerve(StarPieceNrv.RailMove);
        } else {
            this.initNerve(StarPieceNrv.Floating);
        }

        this.calcGravityFlag = false;

        startBtk(this, 'Gift');
        setBtkFrameAndStop(this, 5);

        if (this.type === 0)
            this.makeActorAppeared(sceneObjHolder);
        else
            this.makeActorDead(sceneObjHolder);
    }

    private tryGotJudge(sceneObjHolder: SceneObjHolder, deltaTimeFrames: number): void {
        const newCounter = this.effectCounter + deltaTimeFrames;
        if (checkPass(this.effectCounter, newCounter, 20))
            this.emitGettableEffect(sceneObjHolder, 4.0);
        this.effectCounter = newCounter % 90;
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: StarPieceNrv, deltaTimeFrames: number): void {
        if (currentNerve === StarPieceNrv.Floating) {
            if (isFirstStep(this)) {
                // offBind
                // tryCalcGravity
                // shadow, clipping
            }

            this.rotation[1] += MathConstants.DEG_TO_RAD * 15.0 * deltaTimeFrames;
            this.tryGotJudge(sceneObjHolder, deltaTimeFrames);
        }
    }

    private emitGettableEffect(sceneObjHolder: SceneObjHolder, scale: number): void {
        // Due to a bug in the original game, effectScale effectively does nothing, so it doesn't
        // really make sense to calculate it.
        // const effectScale = this.calcEffectScale(viewerInput, scale, 0.8, true);
        const effectScale = 1.0;

        if (calcDistToCamera(this, sceneObjHolder.viewerInput.camera) > 200)
            emitEffectWithScale(sceneObjHolder, this, 'GetAble', effectScale);

        setEffectColor(this, 'GetAble', this.effectPrmColor, this.effectEnvColor);
    }
}

export class EarthenPipe extends LiveActor {
    private pipeStream: PartsModel | null = null;
    private scaleY: number;
    private axisY = vec3.create();
    private origTranslation = vec3.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, "EarthenPipe");

        const colorFrame = fallback(getJMapInfoArg7(infoIter), 0);
        startBrk(this, 'EarthenPipe');
        setBrkFrameAndStop(this, colorFrame);

        connectToSceneCollisionMapObjStrongLight(sceneObjHolder, this);

        this.initEffectKeeper(sceneObjHolder, null);

        const hiddenFlag = getJMapInfoBool(fallback(getJMapInfoArg2(infoIter), -1));
        if (hiddenFlag)
            hideModel(this);

        vec3.copy(this.origTranslation, this.translation);

        const obeyLocalGravity = getJMapInfoBool(fallback(getJMapInfoArg7(infoIter), -1));
        if (false && obeyLocalGravity) {
            // TODO(jstpierre): Compute gravity vectors
        } else {
            calcUpVec(this.axisY, this);
        }

        this.scaleY = 100 * this.scale[1];
        this.scale[1] = 1.0;
        this.calcTrans();

        if (this.name === "EarthenPipeInWater") {
            this.pipeStream = createPartsModelMapObj(sceneObjHolder, this, "EarthenPipeStream");
            tryStartAllAnim(this.pipeStream, "EarthenPipeStream");
        }
    }

    private calcTrans(): void {
        vec3.copy(this.translation, this.axisY);
        vec3.scale(this.translation, this.translation, this.scaleY);
        vec3.add(this.translation, this.translation, this.origTranslation);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData("EarthenPipe");

        if (getObjectName(infoIter) === "EarthenPipeInWater")
            sceneObjHolder.modelCache.requestObjectData("EarthenPipeStream");
    }
}

function setEffectHostMtx(actor: LiveActor, effectName: string, hostMtx: mat4): void {
    const emitter = assertExists(actor.effectKeeper!.getEmitter(effectName));
    emitter.setHostMtx(hostMtx);
}

function setEffectHostSRT(actor: LiveActor, effectName: string, translation: vec3 | null, rotation: vec3 | null, scale: vec3 | null): void {
    const emitter = assertExists(actor.effectKeeper!.getEmitter(effectName));
    emitter.setHostSRT(translation, rotation, scale);
}

export class BlackHole extends LiveActor {
    private blackHoleModel: ModelObj;
    private effectHostMtx = mat4.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'BlackHoleRange');
        connectToSceneCollisionMapObj(sceneObjHolder, this);
        this.blackHoleModel = createModelObjMapObj(zoneAndLayer, sceneObjHolder, 'BlackHole', 'BlackHole', this.modelInstance!.modelMatrix);
        this.initEffectKeeper(sceneObjHolder, 'BlackHoleRange');
        setEffectHostMtx(this, 'BlackHoleSuction', this.effectHostMtx);

        startBck(this, `BlackHoleRange`);
        startBtk(this, `BlackHoleRange`);
        startBtk(this.blackHoleModel, `BlackHole`);

        let rangeScale: number;
        const arg0 = fallback(getJMapInfoArg0(infoIter), -1);
        if (arg0 < 0) {
            // If this is a cube, we behave slightly differently wrt. scaling.
            if (this.name !== 'BlackHoleCube')
                rangeScale = this.scale[0];
            else
                rangeScale = 1.0;
        } else {
            rangeScale = arg0 / 1000.0;
        }

        this.updateModelScale(rangeScale, rangeScale);
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.calcAndSetBaseMtx(sceneObjHolder, viewerInput);

        if (this.effectKeeper !== null) {
            const front = scratchVec3a;
            const up = scratchVec3b;

            getCamPos(front, viewerInput.camera);
            vec3.sub(front, front, this.translation);
            getCamYdir(up, viewerInput.camera);
            makeMtxFrontUpPos(this.effectHostMtx, front, up, this.translation);
            scaleMatrixScalar(this.effectHostMtx, this.scale[0]);
        }
    }

    private updateModelScale(rangeScale: number, holeScale: number): void {
        vec3.set(this.scale, rangeScale, rangeScale, rangeScale);
        vec3.set(this.blackHoleModel.scale, 0.5 * holeScale, 0.5 * holeScale, 0.5 * holeScale);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData(`BlackHole`);
        sceneObjHolder.modelCache.requestObjectData(`BlackHoleRange`);
    }
}

const enum PeachCastleGardenPlanetNrv { Wait, Damage }

export class PeachCastleGardenPlanet extends MapObjActor<PeachCastleGardenPlanetNrv> {
    private indirectModel: PartsModel | null;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo<PeachCastleGardenPlanetNrv>();
        setupInitInfoPlanet(initInfo);
        initInfo.setupNerve(PeachCastleGardenPlanetNrv.Wait);
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);

        this.indirectModel = createIndirectPlanetModel(sceneObjHolder, this);
    }

    protected initCaseUseSwitchA(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.initCaseUseSwitchA(sceneObjHolder, infoIter);
        // listenStageSwitchOnA(sceneObjHolder, this, this.startDamage.bind(this));
        listenStageSwitchOnOffA(sceneObjHolder, this, this.startDamage.bind(this), this.startWait.bind(this));
    }

    private startWait(sceneObjHolder: SceneObjHolder): void {
        this.setNerve(PeachCastleGardenPlanetNrv.Wait);
    }

    private startDamage(sceneObjHolder: SceneObjHolder): void {
        this.setNerve(PeachCastleGardenPlanetNrv.Damage);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: PeachCastleGardenPlanetNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === PeachCastleGardenPlanetNrv.Wait) {
            if (isFirstStep(this))
                startBrk(this, 'Before');
        } else if (currentNerve === PeachCastleGardenPlanetNrv.Damage) {
            if (isFirstStep(this))
                startBrk(this, 'After');
        }
    }

    protected connectToScene(sceneObjHolder: SceneObjHolder): void {
        connectToScenePlanet(sceneObjHolder, this);
    }
}

const enum HatchWaterPlanetNrv { Wait, Open }

export class HatchWaterPlanet extends LiveActor<HatchWaterPlanetNrv> {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'HatchWaterPlanet');
        connectToScenePlanet(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, null);

        this.initNerve(HatchWaterPlanetNrv.Wait);

        this.makeActorAppeared(sceneObjHolder);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: HatchWaterPlanetNrv, deltaTimeFrames: number): void {
        if (currentNerve === HatchWaterPlanetNrv.Open) {
            if (isFirstStep(this)) {
                startBck(this, 'HatchWaterPlanet');
                startBtk(this, 'HatchWaterPlanet');
            }
        }
    }

    public open(): void {
        this.setNerve(HatchWaterPlanetNrv.Open);
    }
}

const enum KinopioNrv { Wait }

export class Kinopio extends NPCActor<KinopioNrv> {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        vec3.set(this.scale, 1.2, 1.2, 1.2);
        this.initModelManagerWithAnm(sceneObjHolder, 'Kinopio');
        connectToSceneNpc(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initEffectKeeper(sceneObjHolder, null);
        this.initNerve(KinopioNrv.Wait);

        if (isConnectedWithRail(infoIter))
            this.initRailRider(sceneObjHolder, infoIter);

        this.boundingSphereRadius = 100;

        const itemGoodsIdx = fallback(getJMapInfoArg7(infoIter), -1);
        const itemGoods = sceneObjHolder.npcDirector.getNPCItemData('Kinopio', itemGoodsIdx);
        this.equipment(sceneObjHolder, itemGoods);

        this.waitAction = 'Wait';
        this.walkAction = 'Walk';
        this.railGrounded = true;
        this.desiredRailSpeed = 0.83;

        const arg2 = fallback(getJMapInfoArg2(infoIter), -1);
        if (arg2 === 0) {
            this.waitAction = `SpinWait1`;
        } else if (arg2 === 1) {
            this.waitAction = `SpinWait2`;
        } else if (arg2 === 2) {
            this.waitAction = `SpinWait3`;
        } else if (arg2 === 3) {
            // setDistanceToTalk
        } else if (arg2 === 4) {
            // MapObjConnector
            // setNerve(Mount);
        } else if (arg2 === 5) {
            this.waitAction = `SwimWait`;
            this.walkAction = `SwimWait`;
        } else if (arg2 === 6) {
            this.waitAction = `Pickel`;
        } else if (arg2 === 7) {
            this.waitAction = `Sleep`;
        } else if (arg2 === 8) {
            // this.hasTakeOutStar = true;
        } else if (arg2 === 9) {
            this.waitAction = `KinopioGoodsWeapon`;
            this.walkAction = `KinopioGoodsWeaponWalk`;
        } else if (arg2 === 10) {
            this.waitAction = `Joy`;
            this.walkAction = `Joy`;
        } else if (arg2 === 11) {
            this.waitAction = `Rightened`;
        } else if (arg2 === 12) {
            this.waitAction = `StarPieceWait`;
            this.walkAction = `KinopioGoodsStarPieceWalk`;
        } else if (arg2 === 13) {
            this.walkAction = `Getaway`;
            this.desiredRailSpeed = 3.32;
        } else if (arg2 === -1) {
            if (itemGoodsIdx === 2) {
                this.waitAction = `WaitPickel`;
                this.walkAction = `WalkPickel`;
            } else {
                // this.setNerve(KinopioNrv.Far);
            }
        }

        // Bind the color change animation.
        startBrk(this, 'ColorChange');
        setBrkFrameAndStop(this, fallback(getJMapInfoArg1(infoIter), 0));

        // If we have an SW_APPEAR, then hide us until that switch triggers...
        if (fallback(infoIter.getValueNumber('SW_APPEAR'), -1) !== -1)
            this.makeActorDead(sceneObjHolder);

        useStageSwitchSleep(sceneObjHolder, this, infoIter);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: KinopioNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === KinopioNrv.Wait) {
            const nextRailPoint = isExistRail(this) ? getNextRailPointNo(this) : 0;

            // if (!tryStartReactionAndPushNerve(this))
            tryTalkNearPlayerAndStartMoveTalkAction(sceneObjHolder, this, deltaTimeFrames);
            if (isExistRail(this) && getNextRailPointNo(this) !== nextRailPoint)
                this.tryStartArgs();
        }
    }

    private tryStartArgs(): void {
        // TODO(jstpierre): Rail point arg0.
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('Kinopio');
        const itemGoodsIdx = fallback(getJMapInfoArg7(infoIter), -1);
        requestArchivesForNPCGoods(sceneObjHolder, 'Kinopio', itemGoodsIdx);
    }
}

export class KinopioAstro extends Kinopio {
    // Toads living on the Astro Observatory. The game has some special casing for the mail toad,
    // but we don't need that too much here...
}

export class Peach extends NPCActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        const objName = this.name;
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, objName);
        connectToSceneNpc(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);

        this.boundingSphereRadius = 100;

        startAction(this, 'Help');
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);
        const itemGoodsIdx = fallback(getJMapInfoArg7(infoIter), -1);
        requestArchivesForNPCGoods(sceneObjHolder, 'Kinopio', itemGoodsIdx);
    }
}

function decidePose(actor: NPCActor, up: vec3, front: vec3, pos: vec3, rotationSpeedUp: number, rotationSpeedFront: number, translationSpeed: number): void {
    vec3.lerp(actor.translation, actor.translation, pos, translationSpeed);
    if (vec3.equals(up, Vec3Zero))
        debugger;
    if (Number.isNaN(actor.poseQuat[0]))
        debugger;
    if (rotationSpeedUp === 1.0 && rotationSpeedFront === 1.0) {
        makeQuatUpFront(actor.poseQuat, up, front);
    } else {
        blendQuatUpFront(actor.poseQuat, actor.poseQuat, up, front, rotationSpeedUp, rotationSpeedFront);
    }
}

function followRailPose(actor: NPCActor, rotationSpeed: number, translationSpeed: number): void {
    getRailPos(scratchVec3a, actor);
    getRailDirection(scratchVec3b, actor);
    vec3.negate(scratchVec3c, actor.gravityVector);
    decidePose(actor, scratchVec3c, scratchVec3b, scratchVec3a, 1.0, rotationSpeed, translationSpeed);
}

function followRailPoseOnGround(sceneObjHolder: SceneObjHolder, actor: NPCActor, railActor: LiveActor, speed: number): void {
    getRailPos(scratchVec3a, railActor);
    vec3.scaleAndAdd(scratchVec3b, scratchVec3a, actor.gravityVector, -10.0);
    vec3.scale(scratchVec3c, actor.gravityVector, 1000.0);
    getFirstPolyOnLineToMap(sceneObjHolder, scratchVec3a, null, scratchVec3b, scratchVec3c);
    getRailDirection(scratchVec3b, actor);
    vec3.negate(scratchVec3c, actor.gravityVector);
    decidePose(actor, scratchVec3c, scratchVec3b, scratchVec3a, 1.0, speed, 1.0);
}

function startMoveAction(sceneObjHolder: SceneObjHolder, actor: NPCActor, deltaTimeFrames: number): void {
    if (!isExistRail(actor))
        return;

    adjustmentRailCoordSpeed(actor, actor.desiredRailSpeed * deltaTimeFrames, actor.maxChangeRailSpeed);
    moveRailRider(actor);

    if (actor.railGrounded) {
        followRailPoseOnGround(sceneObjHolder, actor, actor, actor.railTurnSpeed * deltaTimeFrames);
    } else {
        followRailPose(actor, actor.railTurnSpeed * deltaTimeFrames, actor.railTurnSpeed * deltaTimeFrames);
    }

    if (isRailReachedGoal(actor))
        reverseRailDirection(actor);
}

function tryStartTurnAction(sceneObjHolder: SceneObjHolder, actor: NPCActor): void {
    if (actor.waitAction !== null)
        tryStartAction(actor, actor.waitAction);
}

function tryStartTalkAction(sceneObjHolder: SceneObjHolder, actor: NPCActor): void {
    tryStartTurnAction(sceneObjHolder, actor);
}

function tryStartMoveTalkAction(sceneObjHolder: SceneObjHolder, actor: NPCActor, deltaTimeFrames: number): void {
    if (!isExistRail(actor)) {
        tryStartTalkAction(sceneObjHolder, actor);
        return;
    }

    if (isNearZero(actor.desiredRailSpeed, 0.001) && isNearZero(getRailCoordSpeed(actor), 0.001)) {
        tryStartTalkAction(sceneObjHolder, actor);
        return;
    }

    // Some stuff related to talking...
    startMoveAction(sceneObjHolder, actor, deltaTimeFrames);
    let action = actor.walkAction;

    if (action !== null)
        tryStartAction(actor, action);
}

function tryTalkNearPlayerAndStartMoveTalkAction(sceneObjHolder: SceneObjHolder, actor: NPCActor, deltaTimeFrames: number): void {
    tryStartMoveTalkAction(sceneObjHolder, actor, deltaTimeFrames);
    // tryTalkNearPlayer(actor);
}

class RemovableTurtle {
    public partsModel: PartsModel;
    // public jetTurtle: JetTurtle;

    constructor(sceneObjHolder: SceneObjHolder, parentActor: LiveActor, isShiny: boolean) {
        if (isShiny) {
            this.partsModel = new PartsModel(sceneObjHolder, 'RemovableTurtle', 'KouraShiny', parentActor, DrawBufferType.NO_SILHOUETTED_MAP_OBJ_STRONG_LIGHT);
        } else {
            this.partsModel = new PartsModel(sceneObjHolder, 'RemovableTurtle', 'Koura', parentActor, DrawBufferType.NO_SILHOUETTED_MAP_OBJ_STRONG_LIGHT);

            // TODO(jstpierre): Where is this done?
            startBrk(this.partsModel, 'Koura');
            setBrkFrameAndStop(this.partsModel, 0);
        }

        // this.partsModel.isAttached = true;
        this.partsModel.initFixedPositionRelative(vec3.set(scratchVec3, -5.85, -68.0, 30.0));
        this.partsModel.makeActorDead(sceneObjHolder);
    }

    public tryAttach(sceneObjHolder: SceneObjHolder): void {
        if (isDead(this.partsModel))
            this.partsModel.makeActorAppeared(sceneObjHolder);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, isShiny: boolean): void {
        if (isShiny)
            sceneObjHolder.modelCache.requestObjectData('KouraShiny');
        else
            sceneObjHolder.modelCache.requestObjectData('Koura');
    }
}

const enum PenguinNrv { Wait, Dive }

export class Penguin extends NPCActor<PenguinNrv> {
    private mode: number;
    private diveCounter: number = 0;
    private removableTurtle: RemovableTurtle | null = null;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        const objName = this.name;
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, objName);
        connectToSceneNpc(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initEffectKeeper(sceneObjHolder, null);

        this.boundingSphereRadius = 100;

        if (isConnectedWithRail(infoIter)) {
            this.initRailRider(sceneObjHolder, infoIter);
            moveCoordAndTransToNearestRailPos(this);
        }

        this.mode = fallback(getJMapInfoArg0(infoIter), -1);
        if (this.mode === 4) {
            this.removableTurtle = new RemovableTurtle(sceneObjHolder, this, false);
            this.removableTurtle.tryAttach(sceneObjHolder);
        }

        if (this.mode === 0) {
            this.waitAction = `SitDown`;
        } else if (this.mode === 1) {
            this.waitAction = `SwimWait`;
            this.walkAction = `Swim`;
            this.desiredRailSpeed = 5.0;
        } else if (this.mode === 2) {
            this.waitAction = `SwimWaitSurface`;
            this.walkAction = `SwimSurface`;
            this.desiredRailSpeed = 5.0;
        } else if (this.mode === 3) {
            this.waitAction = `SwimWaitSurface`;
        } else if (this.mode === 4) {
            this.waitAction = `SwimTurtleTalk`;
            this.walkAction = `SwimTurtle`;
            this.desiredRailSpeed = 10.0;
        } else if (this.mode === 6) {
            this.waitAction = `Wait`;
            this.walkAction = `DashA`;
            this.desiredRailSpeed = 6.0;
            this.railTurnSpeed = 0.8;
            this.railGrounded = true;
        } else {
            this.waitAction = `Wait`;
            this.walkAction = `Walk`;
            this.desiredRailSpeed = 1.5;
            this.turnBckRate = 2.0;
            this.railGrounded = true;
        }

        setBckFrameAtRandom(this);

        startBrk(this, 'ColorChange');
        setBrkFrameAndStop(this, fallback(getJMapInfoArg7(infoIter), 0));

        this.initNerve(PenguinNrv.Wait);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        super.initAfterPlacement(sceneObjHolder);

        if (this.mode === 2 || this.mode === 3) {
            calcGravity(sceneObjHolder, this);
            vec3.negate(scratchVec3, this.gravityVector);
            turnQuatYDirRad(this.poseQuat, this.poseQuat, scratchVec3, MathConstants.TAU / 2);
        }
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: PenguinNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === PenguinNrv.Wait) {
            if (isFirstStep(this))
                this.diveCounter = getRandomInt(120, 300);

            tryTalkNearPlayerAndStartMoveTalkAction(sceneObjHolder, this, deltaTimeFrames);

            if (this.mode === 3 && isGreaterStep(this, this.diveCounter))
                this.setNerve(PenguinNrv.Dive);
        } else if (currentNerve === PenguinNrv.Dive) {
            if (isFirstStep(this)) {
                startBck(this, `SwimDive`);
            }

            if (isBckStopped(this)) {
                // TODO(jstpierre): TalkCtrl
                startAction(this, `SwimWaitSurface`);
                this.setNerve(PenguinNrv.Wait);
            }
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);

        const arg0 = getJMapInfoArg0(infoIter);
        if (arg0 === 4)
            RemovableTurtle.requestArchives(sceneObjHolder, false);
    }
}

export class PenguinRacer extends NPCActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, "Penguin");
        connectToSceneNpc(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initEffectKeeper(sceneObjHolder, null);

        this.boundingSphereRadius = 100;

        const itemGoods = sceneObjHolder.npcDirector.getNPCItemData(this.name, 0);
        this.equipment(sceneObjHolder, itemGoods);

        const arg7 = fallback(getJMapInfoArg7(infoIter), 0);
        startBrk(this, 'ColorChange');
        setBrkFrameAndStop(this, arg7);

        startAction(this, 'RacerWait');
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('Penguin');
        requestArchivesForNPCGoods(sceneObjHolder, getObjectName(infoIter), 0);
    }
}

export class TicoComet extends NPCActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        const objName = this.name;
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, objName);
        connectToSceneNpc(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initEffectKeeper(sceneObjHolder, null);

        this.boundingSphereRadius = 100;

        const itemGoodsIdx = 0;
        const itemGoods = sceneObjHolder.npcDirector.getNPCItemData('TicoComet', itemGoodsIdx);
        this.equipment(sceneObjHolder, itemGoods);

        startAction(this.goods0!, 'LeftRotate');
        startAction(this.goods1!, 'RightRotate');

        startBtk(this, "TicoComet");
        startBva(this, "Small0");

        startBrk(this, 'Normal');
        setBrkFrameAndStop(this, 0);

        startAction(this, 'Wait');
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);
        const itemGoodsIdx = 0;
        requestArchivesForNPCGoods(sceneObjHolder, 'TicoComet', itemGoodsIdx);
    }
}

export class CoinRotater extends NameObj {
    public coinRotateY: number = 0.0;
    public coinHiSpeedRotateY: number = 0.0;
    public coinInWaterRotateY: number = 0.0;

    public coinRotateMtx = mat4.create();
    public coinHiSpeedRotateMtx = mat4.create();
    public coinInWaterRotateMtx = mat4.create();

    constructor(sceneObjHolder: SceneObjHolder) {
        super(sceneObjHolder, 'CoinRotater');

        connectToSceneMapObjMovement(sceneObjHolder, this);
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);

        this.coinRotateY += getDeltaTimeFrames(viewerInput) * 8.0 * MathConstants.DEG_TO_RAD;
        this.coinInWaterRotateY += getDeltaTimeFrames(viewerInput) * 4.0 * MathConstants.DEG_TO_RAD;
        this.coinHiSpeedRotateY += getDeltaTimeFrames(viewerInput) * 16.0 * MathConstants.DEG_TO_RAD;

        computeModelMatrixR(this.coinRotateMtx, 0, this.coinRotateY, 0);
        computeModelMatrixR(this.coinInWaterRotateMtx, 0, this.coinInWaterRotateY, 0);
        computeModelMatrixR(this.coinHiSpeedRotateMtx, 0, this.coinHiSpeedRotateY, 0);
    }
}

class Coin extends LiveActor {
    public useLocalGravity: boolean = false;
    private isInWater: boolean = false;
    private airBubble: PartsModel | null = null;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter | null, protected isPurpleCoin: boolean) {
        super(zoneAndLayer, sceneObjHolder, isPurpleCoin ? 'PurpleCoin' : 'Coin');

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, this.isPurpleCoin ? 'PurpleCoin' : 'Coin');
        connectToSceneItemStrongLight(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);

        if (infoIter !== null) {
            const isNeedBubble = getJMapInfoBool(fallback(getJMapInfoArg7(infoIter), -1));
            if (isNeedBubble) {
                this.airBubble = createPartsModelNoSilhouettedMapObj(sceneObjHolder, this, "AirBubble", vec3.fromValues(0, 70, 0));
                startBck(this.airBubble, 'Move');
            }

            this.useLocalGravity = getJMapInfoBool(fallback(getJMapInfoArg4(infoIter), -1));
        }

        this.calcGravityFlag = false;
        if (this.useLocalGravity) {
            calcActorAxis(null, this.gravityVector, null, this);
            vec3.negate(this.gravityVector, this.gravityVector);
        }

        if (infoIter === null) {
            this.makeActorDead(sceneObjHolder);
        } else {
            if (useStageSwitchReadAppear(sceneObjHolder, this, infoIter)) {
                syncStageSwitchAppear(sceneObjHolder, this);
                this.makeActorDead(sceneObjHolder);
            } else {
                this.appearFixInit(sceneObjHolder);
            }
        }

        useStageSwitchSleep(sceneObjHolder, this, infoIter);
    }

    private appearFixInit(sceneObjHolder: SceneObjHolder): void {
        this.makeActorAppeared(sceneObjHolder);
        // validateClipping
        // validateHitSensors
        // offBind
    }

    public makeActorAppeared(sceneObjHolder: SceneObjHolder): void {
        this.calcGravityFlag = false;
        if (!this.useLocalGravity) {
            calcGravity(sceneObjHolder, this);
        }

        super.makeActorAppeared(sceneObjHolder);
        this.isInWater = isInWater(sceneObjHolder, this.translation);
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder): void {
        if (this.useLocalGravity) {
            this.calcAndSetBaseMtxBase();
        } else {
            vec3.negate(scratchVec3, this.gravityVector);
            makeMtxUpNoSupportPos(this.modelInstance!.modelMatrix, scratchVec3, this.translation);
        }

        sceneObjHolder.create(SceneObj.CoinRotater);
        const coinRotater = sceneObjHolder.coinRotater!;
        const rotateMtx = this.isInWater ? coinRotater.coinInWaterRotateMtx : coinRotater.coinRotateMtx;

        mat4.mul(this.modelInstance!.modelMatrix, this.modelInstance!.modelMatrix, rotateMtx);
    }
}

export function createCoin(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter | null): Coin {
    return new Coin(zoneAndLayer, sceneObjHolder, infoIter, false);
}

export function createPurpleCoin(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter | null): Coin {
    return new Coin(zoneAndLayer, sceneObjHolder, infoIter, true);
}

export function requestArchivesCoin(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
    sceneObjHolder.modelCache.requestObjectData('Coin');
    const isNeedBubble = getJMapInfoBool(fallback(getJMapInfoArg7(infoIter), -1));
    if (isNeedBubble)
        sceneObjHolder.modelCache.requestObjectData('AirBubble');
}

export function requestArchivesPurpleCoin(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
    sceneObjHolder.modelCache.requestObjectData('PurpleCoin');
    const isNeedBubble = getJMapInfoBool(fallback(getJMapInfoArg7(infoIter), -1));
    if (isNeedBubble)
        sceneObjHolder.modelCache.requestObjectData('AirBubble');
}

const enum CoinGroupNrv { Wait, Appear }

abstract class CoinGroup extends LiveActor<CoinGroupNrv> {
    protected coinArray: Coin[] = [];

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter, private isPurpleCoin: boolean) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        const coinCount = fallback(getJMapInfoArg0(infoIter), 0);

        for (let i = 0; i < coinCount; i++) {
            // TODO(jstpierre): This is technically wrong, to pass infoIter through to the Coin like this.
            // Typically, setShadowAndPoseModeFromJMapInfoIter is called. This has the effect of causing the
            // Coins to appear by default, even when attached to a switch.

            if (this.isPurpleCoin) {
                this.coinArray.push(createPurpleCoin(zoneAndLayer, sceneObjHolder, infoIter));
            } else {
                this.coinArray.push(createCoin(zoneAndLayer, sceneObjHolder, infoIter));
            }

            // Coin has been default init'd at this point. Set some extra properties on it.
            const coin = this.coinArray[i];
            // if (coin.useLocalGravity)
            //     initDefaultPos(sceneObjHolder, coin, infoIter);
            vec3.set(coin.scale, 1, 1, 1);
        }

        this.initCoinArray(sceneObjHolder, infoIter);
        this.placementCoin();

        if (useStageSwitchReadAppear(sceneObjHolder, this, infoIter)) {
            syncStageSwitchAppear(sceneObjHolder, this);
            connectToSceneMapObjMovement(sceneObjHolder, this);
            this.initNerve(CoinGroupNrv.Appear);
        } else {
            this.appearCoinFix(sceneObjHolder);
        }

        this.makeActorDead(sceneObjHolder);
    }

    private appearCoinFix(sceneObjHolder: SceneObjHolder): void {
        for (let i = 0; i < this.coinArray.length; i++)
            this.coinArray[i].makeActorAppeared(sceneObjHolder);
    }

    protected abstract initCoinArray(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void;
    protected abstract placementCoin(): void;

    protected setCoinTrans(i: number, trans: vec3): void {
        vec3.copy(this.coinArray[i].translation, trans);
    }
}

class RailCoin extends CoinGroup {
    protected initCoinArray(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initRailRider(sceneObjHolder, infoIter);
    }

    protected placementCoin(): void {
        // TODO(jstpierre): MercatorRail
        this.placementNormalRail();
    }

    protected placementNormalRail(): void {
        const coinCount = this.coinArray.length;

        const totalLength = getRailTotalLength(this);

        let speed: number;
        if (coinCount < 2) {
            speed = 0;
        } else {
            if (isLoopRail(this))
                speed = totalLength / coinCount;
            else
                speed = totalLength / (coinCount - 1);
        }

        moveCoordToStartPos(this);
        setRailCoordSpeed(this, speed);

        for (let i = 0; i < coinCount; i++) {
            getRailPos(scratchVec3, this);
            this.setCoinTrans(i, scratchVec3);
            moveRailRider(this);
        }
    }

    // Rail debugging code...
    /*
    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        this.railRider!.debugDrawRail(viewerInput.camera);
    }
    */
}

export function createRailCoin(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): RailCoin {
    return new RailCoin(zoneAndLayer, sceneObjHolder, infoIter, false);
}

export function createPurpleRailCoin(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): RailCoin {
    return new RailCoin(zoneAndLayer, sceneObjHolder, infoIter, true);
}

class CircleCoinGroup extends CoinGroup {
    private radius: number;

    protected initCoinArray(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        this.radius = fallback(getJMapInfoArg2(infoIter), 200);
        initDefaultPos(sceneObjHolder, this, infoIter);
    }

    protected placementCoin(): void {
        makeMtxTRFromActor(scratchMatrix, this);
        vec3.set(scratchVec3a, scratchMatrix[0], scratchMatrix[1], scratchMatrix[2]);
        vec3.set(scratchVec3b, scratchMatrix[8], scratchMatrix[9], scratchMatrix[10]);

        const coinCount = this.coinArray.length;
        for (let i = 0; i < coinCount; i++) {
            const theta = (i / coinCount) * MathConstants.TAU;
            vec3.set(scratchVec3, 0, 0, 0);
            vec3.scaleAndAdd(scratchVec3, scratchVec3, scratchVec3a, this.radius * Math.cos(theta));
            vec3.scaleAndAdd(scratchVec3, scratchVec3, scratchVec3b, this.radius * Math.sin(theta));
            vec3.add(scratchVec3, scratchVec3, this.translation);
            this.setCoinTrans(i, scratchVec3);
        }
    }
}

export function createCircleCoinGroup(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): CircleCoinGroup {
    return new CircleCoinGroup(zoneAndLayer, sceneObjHolder, infoIter, false);
}

export function createPurpleCircleCoinGroup(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): CircleCoinGroup {
    return new CircleCoinGroup(zoneAndLayer, sceneObjHolder, infoIter, true);
}

export class QuestionCoin extends LiveActor {
    private useLocalGravity: boolean = false;
    private mtx = mat4.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'QuestionCoin');

        initDefaultPos(sceneObjHolder, this, infoIter);

        this.useLocalGravity = getJMapInfoBool(fallback(getJMapInfoArg2(infoIter), -1));

        // TODO(jstpierre): initAfterPlacement

        if (this.useLocalGravity) {
            makeMtxTRFromActor(this.mtx, this);
        } else {
            makeMtxTRFromActor(this.mtx, this);
            getMatrixAxisZ(scratchVec3a, this.mtx);
            vec3.negate(scratchVec3b, this.gravityVector);
            makeMtxUpFrontPos(this.mtx, scratchVec3b, scratchVec3a, this.translation);
        }

        this.initModelManagerWithAnm(sceneObjHolder, 'QuestionCoin');
        startBpk(this, 'QuestionCoin');
        connectToSceneItemStrongLight(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, null);

        useStageSwitchWriteDead(sceneObjHolder, this, infoIter);

        if (useStageSwitchReadAppear(sceneObjHolder, this, infoIter)) {
            syncStageSwitchAppear(sceneObjHolder, this);
            this.makeActorDead(sceneObjHolder);
        } else {
            this.makeActorAppeared(sceneObjHolder);
        }
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        sceneObjHolder.create(SceneObj.CoinRotater);
        const rotateMtx = sceneObjHolder.coinRotater!.coinInWaterRotateMtx;
        mat4.mul(this.modelInstance!.modelMatrix, this.mtx, rotateMtx);
    }

    public makeActorAppeared(sceneObjHolder: SceneObjHolder): void {
        super.makeActorAppeared(sceneObjHolder);
        showModel(this);
        emitEffect(sceneObjHolder, this, 'Appear');
        emitEffect(sceneObjHolder, this, 'Light');
        if (isValidSwitchDead(this))
            this.stageSwitchCtrl!.offSwitchDead(sceneObjHolder);
    }

    public makeActorDead(sceneObjHolder: SceneObjHolder): void {
        if (isValidSwitchDead(this))
            this.stageSwitchCtrl!.onSwitchDead(sceneObjHolder);
        super.makeActorDead(sceneObjHolder);
    }
}

export class MiniRoutePoint extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, pointInfo: WorldmapPointInfo) {
        super(zoneAndLayer, sceneObjHolder, 'MiniRoutePoint');
        this.initModelManagerWithAnm(sceneObjHolder, 'MiniRoutePoint');
        vec3.copy(this.translation, pointInfo.position);

        tryStartAllAnim(this, 'Open');
        if (pointInfo.isPink)
            startBrk(this, 'TicoBuild');
        else
            startBrk(this, 'Normal');

        if (pointInfo.isSmall)
            vec3.set(this.scale, 0.5, 1, 0.5);

        connectToSceneNoSilhouettedMapObj(sceneObjHolder, this);
    }
}

export class MiniRouteGalaxy extends LiveActor {
    private rotateSpeed: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter, pointInfo: WorldmapPointInfo) {
        super(zoneAndLayer, sceneObjHolder, 'MiniRouteGalaxy');

        const miniatureName = assertExists(infoIter.getValueString('MiniatureName'));
        const miniatureType = assertExists(infoIter.getValueString('StageType'));
        const miniatureScale = assertExists(infoIter.getValueNumber('ScaleMin'));
        const miniatureOffset = vec3.fromValues(
            assertExists(infoIter.getValueNumber('PosOffsetX')),
            assertExists(infoIter.getValueNumber('PosOffsetY')),
            assertExists(infoIter.getValueNumber('PosOffsetZ')));

        vec3.add(this.translation, pointInfo.position, miniatureOffset);
        vec3.set(this.scale, miniatureScale, miniatureScale, miniatureScale);

        this.initModelManagerWithAnm(sceneObjHolder, miniatureName);
        this.initEffectKeeper(sceneObjHolder, null);

        if (miniatureType === 'BossGalaxyLv3') {
            this.rotateSpeed = 0;
            this.rotation[1] = -0.25 * Math.PI;
        } else {
            this.rotateSpeed = 0.25 * MathConstants.DEG_TO_RAD;
        }

        connectToSceneNoSilhouettedMapObj(sceneObjHolder, this);

        startAction(this, miniatureName);
        emitEffect(sceneObjHolder, this, miniatureName);
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.calcAndSetBaseMtx(sceneObjHolder, viewerInput);

        const rotateY = getTimeFrames(viewerInput) * this.rotateSpeed;
        mat4.rotateY(this.modelInstance!.modelMatrix, this.modelInstance!.modelMatrix, rotateY);
    }
}

export class MiniRoutePart extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter, pointInfo: WorldmapPointInfo) {
        super(zoneAndLayer, sceneObjHolder, 'MiniRoutePart');

        const partsTypeName = infoIter.getValueString('PartsTypeName');
        let modelName: string;
        if (partsTypeName === 'WorldWarpPoint')
            modelName = 'MiniWorldWarpPoint';
        else if (partsTypeName === 'EarthenPipe')
            modelName = 'MiniEarthenPipe';
        else if (partsTypeName === 'StarCheckPoint')
            modelName = 'MiniStarCheckPointMark';
        else if (partsTypeName === 'TicoRouteCreator')
            modelName = 'MiniTicoMasterMark';
        else if (partsTypeName === 'StarPieceMine')
            modelName = 'MiniStarPieceMine';
        else
            throw "whoops";

        this.initModelManagerWithAnm(sceneObjHolder, modelName);
        if (partsTypeName === 'WorldWarpPoint')
            this.modelInstance!.modelData.shapeData[0].sortKeyBias = 1;
        vec3.copy(this.translation, pointInfo.position);

        tryStartAllAnim(this, 'Open');
        if (pointInfo.isPink)
            startBrkIfExist(this, 'TicoBuild');
        else
            startBrkIfExist(this, 'Normal');

        this.initEffectKeeper(sceneObjHolder, null);

        connectToSceneNoSilhouettedMapObj(sceneObjHolder, this);
    }
}

export class SimpleEffectObj extends LiveActor {
    private isVisible: boolean = true;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));
        initDefaultPos(sceneObjHolder, this, infoIter);

        if (sceneObjHolder.effectSystem === null)
            return;

        this.initEffectKeeper(sceneObjHolder, this.name);
        emitEffect(sceneObjHolder, this, this.name);

        connectToSceneMapObjMovement(sceneObjHolder, this);
    }

    protected getClippingRadius(): number {
        return 500;
    }

    protected getFarClipDistance(): number {
        return 50;
    }

    protected getClippingCenterOffset(v: vec3): void {
        vec3.set(v, 0, 0, 0);
    }

    protected isSyncClipping(): boolean {
        return false;
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);

        this.getClippingCenterOffset(scratchVec3);
        vec3.add(scratchVec3, this.translation, scratchVec3);

        const visibleScenario = this.visibleScenario && this.visibleAlive;
        let visible = visibleScenario;

        const camera = viewerInput.camera;
        if (visible)
            visible = camera.frustum.containsSphere(scratchVec3, this.getClippingRadius());

        if (this.isVisible === visible)
            return;

        this.isVisible = visible;
        if (this.effectKeeper !== null)
            this.effectKeeper.setDrawParticle(visible);

        if (this.isSyncClipping()) {
            if (visible)
                emitEffect(sceneObjHolder, this, this.name);
            else
                deleteEffectAll(this);
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        // Don't need anything, effectSystem is already built-in.
    }
}

export class EffectObjR500F50 extends SimpleEffectObj {
    protected getClippingRadius(): number {
        return 500;
    }
}

export class EffectObjR1000F50 extends SimpleEffectObj {
    protected getClippingRadius(): number {
        return 1000;
    }
}

export class EffectObjR100F50SyncClipping extends SimpleEffectObj {
    protected getClippingRadius(): number {
        return 1000;
    }

    protected isSyncClipping(): boolean {
        return true;
    }
}

export class EffectObj10x10x10SyncClipping extends SimpleEffectObj {
    protected getClippingCenterOffset(v: vec3): void {
        vec3.set(v, 0, 580, 0);
    }

    protected getClippingRadius(): number {
        return 1000;
    }

    protected isSyncClipping(): boolean {
        return true;
    }
}

export class EffectObj20x20x10SyncClipping extends SimpleEffectObj {
    protected getClippingCenterOffset(v: vec3): void {
        vec3.set(v, 0, 200, 0);
    }

    protected getClippingRadius(): number {
        return 1000;
    }

    protected isSyncClipping(): boolean {
        return true;
    }
}

export class EffectObj50x50x10SyncClipping extends SimpleEffectObj {
    protected getClippingCenterOffset(v: vec3): void {
        vec3.set(v, 0, 200, 0);
    }

    protected getClippingRadius(): number {
        return 2500;
    }

    protected isSyncClipping(): boolean {
        return true;
    }
}

export class RandomEffectObj extends SimpleEffectObj {
    private counter: number = -1;
    private randBase: number;
    private randRange: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, infoIter);

        this.randBase = fallback(getJMapInfoArg0(infoIter), 600);
        this.randRange = fallback(getJMapInfoArg1(infoIter), 180);

        this.initNerve(0);
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);

        if (this.counter === -1)
            this.counter = this.randBase + (Math.random() * this.randRange * 2 - this.randRange);

        if (this.getNerveStep() >= this.counter) {
            emitEffect(sceneObjHolder, this, this.name);
            this.counter = -1;
            this.spine!.setNerve(0);
        }
    }

    protected getClippingRadius(): number {
        return 400;
    }
}

export class GCaptureTarget extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, "GCaptureTarget");
        connectToSceneNoSilhouettedMapObjStrongLight(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, null);

        emitEffect(sceneObjHolder, this, 'TargetLight');
        emitEffect(sceneObjHolder, this, 'TouchAble');

        startBck(this, 'Wait');
        startBrk(this, 'Switch');
        setBrkFrameAndStop(this, 1);
    }
}

const enum FountainBigNrv { WaitPhase, Wait, Sign, SignStop, Spout, SpoutEnd }

export class FountainBig extends LiveActor<FountainBigNrv> {
    private upVec = vec3.create();
    private randomPhase: number = 0;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, "FountainBig");
        connectToSceneMapObj(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, null);

        calcUpVec(this.upVec, this);
        vec3.scaleAndAdd(this.upVec, this.translation, this.upVec, 300);

        hideModel(this);
        startBtk(this, "FountainBig");

        // TODO(jstpierre): Figure out what causes this phase for realsies. Might just be culling...
        this.randomPhase = (Math.random() * 300) | 0;

        this.initNerve(FountainBigNrv.WaitPhase);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: FountainBigNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === FountainBigNrv.WaitPhase) {
            if (isGreaterStep(this, this.randomPhase)) {
                this.setNerve(FountainBigNrv.Wait);
                return;
            }
        } else if (currentNerve === FountainBigNrv.Wait) {
            if (isGreaterStep(this, 120)) {
                this.setNerve(FountainBigNrv.Sign);
                return;
            }
        } else if (currentNerve === FountainBigNrv.Sign) {
            if (isFirstStep(this))
                emitEffect(sceneObjHolder, this, 'FountainBigSign');

            if (isGreaterStep(this, 80)) {
                this.setNerve(FountainBigNrv.SignStop);
                return;
            }
        } else if (currentNerve === FountainBigNrv.SignStop) {
            if (isFirstStep(this))
                deleteEffect(sceneObjHolder, this, 'FountainBigSign');

            if (isGreaterStep(this, 30)) {
                this.setNerve(FountainBigNrv.Spout);
                return;
            }
        } else if (currentNerve === FountainBigNrv.Spout) {
            if (isFirstStep(this)) {
                showModel(this);
                emitEffect(sceneObjHolder, this, 'FountainBig');
            }

            const t = calcNerveRate(this, 20);
            if (t <= 1) {
                this.scale[1] = clamp(t, 0.01, 1);
            }

            if (isGreaterStep(this, 180)) {
                deleteEffect(sceneObjHolder, this, 'FountainBig');
                this.setNerve(FountainBigNrv.SpoutEnd);
                return;
            }
        } else if (currentNerve === FountainBigNrv.SpoutEnd) {
            const t = 1 - calcNerveRate(this, 10);
            this.scale[1] = clamp(t, 0.01, 1);

            if (isGreaterStep(this, 10)) {
                hideModel(this);
                this.setNerve(FountainBigNrv.Wait);
                return;
            }
        }
    }
}

export class Fountain extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));
        initDefaultPos(sceneObjHolder, this, infoIter);
        connectToSceneMapObjMovement(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, getObjectName(infoIter));
        emitEffect(sceneObjHolder, this, getObjectName(infoIter));
    }

    public static requestArchives(): void {
        // Do nothing; no archive for this object.
    }
}

export class PhantomTorch extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));
        initDefaultPos(sceneObjHolder, this, infoIter);
        connectToSceneMapObjMovement(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, getObjectName(infoIter));
        emitEffect(sceneObjHolder, this, getObjectName(infoIter));
    }

    public static requestArchives(): void {
        // Do nothing; no archive for this object.
    }
}

export class AstroEffectObj extends SimpleEffectObj {
    // The game will check whether the user has the correct dome enabled,
    // but it is otherwise identical to SimpleEffectObj.
}

export class AstroCountDownPlate extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, "AstroCountDownPlate");
        connectToSceneMapObj(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, null);
        emitEffect(sceneObjHolder, this, "Light");

        startBrk(this, "Green");
    }
}

export class Butler extends NPCActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'Butler');
        connectToSceneNpc(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initEffectKeeper(sceneObjHolder, null);

        const location = getJMapInfoArg0(infoIter);

        startAction(this, 'Wait');
    }
}

export class Rosetta extends NPCActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'Rosetta');
        connectToSceneIndirectNpc(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initEffectKeeper(sceneObjHolder, null);

        startAction(this, 'WaitA');
    }
}

export class Tico extends NPCActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'Tico');
        connectToSceneIndirectNpc(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initEffectKeeper(sceneObjHolder, null);

        const color = fallback(getJMapInfoArg0(infoIter), -1);
        if (color !== -1) {
            startBrk(this, 'ColorChange');
            setBrkFrameAndStop(this, color);
        }

        startAction(this, 'Wait');
        setBckFrameAtRandom(this);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('Tico');
    }
}

export class TicoAstro extends Tico {
    // TicoAstro checks current number of green stars against arg2 and shows/hides respectively...
}

export class Sky extends LiveActor {
    // Some people want to disable skyboxes from translating.
    private isSkybox = true;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, this.name);
        connectToSceneSky(sceneObjHolder, this);

        useStageSwitchWriteA(sceneObjHolder, this, infoIter);
        useStageSwitchWriteB(sceneObjHolder, this, infoIter);
        useStageSwitchReadAppear(sceneObjHolder, this, infoIter);

        if (this.name === 'SummerSky') {
            // TODO(jstpierre): SpaceInner
        }

        // TODO(jstpierre): MirrorReflectionModel

        tryStartAllAnim(this, this.name);
        // registerDemoSimpleCastAll
        // initNerve

        if (isValidSwitchAppear(this)) {
            syncStageSwitchAppear(sceneObjHolder, this);
            this.makeActorDead(sceneObjHolder);
        } else {
            this.makeActorAppeared(sceneObjHolder);
        }
    }

    public calcAnim(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        if (this.isSkybox)
            getCamPos(this.translation, viewerInput.camera);
        super.calcAnim(sceneObjHolder, viewerInput);
    }
}

const enum AirNrv { In, Out }

export class Air extends LiveActor<AirNrv> {
    private distInThresholdSq: number;
    private distOutThresholdSq: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, this.name);
        connectToSceneAir(sceneObjHolder, this);

        let thresholdParam = fallback(getJMapInfoArg0(infoIter), -1);
        if (thresholdParam < 0)
            thresholdParam = 70;

        const distInThreshold = 100.0 * thresholdParam;
        this.distInThresholdSq = distInThreshold*distInThreshold;
        const distOutThreshold = 100.0 * (20.0 + thresholdParam);
        this.distOutThresholdSq = distOutThreshold*distOutThreshold;

        tryStartAllAnim(this, getObjectName(infoIter));
        this.initNerve(AirNrv.In);
    }

    public isDrawing(): boolean {
        return !isDead(this) && !isHiddenModel(this);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: AirNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        const distanceToPlayer = calcSqDistanceToPlayer(this, sceneObjHolder.viewerInput.camera);

        if (currentNerve === AirNrv.Out) {
            if (!isHiddenModel(this) && isAnyAnimStopped(this, 'Disappear'))
                hideModel(this);

            if (distanceToPlayer < this.distInThresholdSq) {
                showModel(this);
                tryStartAllAnim(this, 'Appear');
                this.setNerve(AirNrv.In);
            }
        } else if (currentNerve === AirNrv.In) {
            if (distanceToPlayer > this.distOutThresholdSq) {
                tryStartAllAnim(this, 'Disappear');
                this.setNerve(AirNrv.Out);
            }
        }
    }
}

export class PriorDrawAirHolder extends NameObj {
    public airs: PriorDrawAir[] = [];
    public forcePriorAir = false;

    constructor(sceneObjHolder: SceneObjHolder) {
        super(sceneObjHolder, 'PriorDrawAirHolder');
    }

    public add(air: PriorDrawAir): void {
        this.airs.push(air);
    }

    public isExistValidDrawAir(): boolean {
        if (this.forcePriorAir)
            return true;
        for (let i = 0; i < this.airs.length; i++)
            if (this.airs[i].isDrawing())
                return true;
        return false;
    }
}

export class PriorDrawAir extends Air {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, infoIter);
    }
}

const enum ShootingStarNrv { PreShooting, Shooting, WaitForNextShoot }

export class ShootingStar extends LiveActor<ShootingStarNrv> {
    private delay: number;
    private distance: number;
    private axisY = vec3.create();
    private initialTranslation = vec3.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        this.initModelManagerWithAnm(sceneObjHolder, this.name);
        connectToSceneMapObj(sceneObjHolder, this);
        initDefaultPos(sceneObjHolder, this, infoIter);
        vec3.copy(this.initialTranslation, this.translation);

        const numStarBits = fallback(getJMapInfoArg0(infoIter), 5);
        this.delay = fallback(getJMapInfoArg1(infoIter), 240);
        this.distance = fallback(getJMapInfoArg2(infoIter), 2000);

        this.initNerve(ShootingStarNrv.PreShooting);
        this.initEffectKeeper(sceneObjHolder, 'ShootingStar');

        this.calcAndSetBaseMtxBase();

        calcUpVec(this.axisY, this);

        startBpk(this, 'ShootingStar');
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: ShootingStarNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        const SPEED = 10 * MathConstants.DEG_TO_RAD;
        this.rotation[1] = (this.rotation[1] + (SPEED * deltaTimeFrames)) % MathConstants.TAU;

        if (currentNerve === ShootingStarNrv.PreShooting) {
            if (isFirstStep(this)) {
                vec3.scaleAndAdd(this.translation, this.initialTranslation, this.axisY, this.distance);
                showModel(this);
                emitEffect(sceneObjHolder, this, 'ShootingStarAppear');
            }

            const scale = calcNerveRate(this, 20);
            vec3.set(this.scale, scale, scale, scale);

            if (isGreaterStep(this, 20)) {
                this.setNerve(ShootingStarNrv.Shooting);
            }
        } else if (currentNerve === ShootingStarNrv.Shooting) {
            if (isFirstStep(this)) {
                vec3.negate(this.velocity, this.axisY);
                vec3.scale(this.velocity, this.velocity, 25);
                emitEffect(sceneObjHolder, this, 'ShootingStarBlur');
            }

            if (isGreaterStep(this, 360)) {
                this.setNerve(ShootingStarNrv.WaitForNextShoot);
                deleteEffect(sceneObjHolder, this, 'ShootingStarBlur');
            }
        } else if (currentNerve === ShootingStarNrv.WaitForNextShoot) {
            if (isFirstStep(this)) {
                hideModel(this);
                emitEffect(sceneObjHolder, this, 'ShootingStarBreak');
                vec3.set(this.velocity, 0, 0, 0);
            }

            if (isGreaterStep(this, this.delay)) {
                this.setNerve(ShootingStarNrv.PreShooting);
            }
        }
    }
}

export class AstroMapObj extends MapObjActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo();
        const objectName = getObjectName(infoIter);
        const domeId = fallback(getJMapInfoArg0(infoIter), -1);
        initInfo.setupModelName(AstroMapObj.getModelName(objectName, domeId));
        initInfo.setupConnectToScene();
        initInfo.setupEffect(objectName);

        if (objectName === 'AstroRotateStepA' || objectName === 'AstroRotateStepB' || objectName === 'AstroDecoratePartsA')
            initInfo.setupRotator();

        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);

        tryStartAllAnim(this, 'Open');
        this.tryStartAllAnimAndEffect(sceneObjHolder, 'AliveWait');

        if (this.rotator !== null)
            this.startMapPartsFunctions(sceneObjHolder);

        this.setStateAlive(sceneObjHolder);
    }

    private tryStartAllAnimAndEffect(sceneObjHolder: SceneObjHolder, name: string): void {
        tryStartAllAnim(this, name);
        if (this.isObjectName('AstroDomeEntranceKitchen'))
            emitEffect(sceneObjHolder, this, 'KitchenSmoke');
        if (isRegisteredEffect(this, name))
            emitEffect(sceneObjHolder, this, name);
    }

    private setStateAlive(sceneObjHolder: SceneObjHolder): void {
        tryStartAllAnim(this, 'Revival');
        this.tryStartAllAnimAndEffect(sceneObjHolder, 'AliveWait');
        tryStartAllAnim(this, 'Open');
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        const objectName = getObjectName(infoIter);
        const domeId = fallback(getJMapInfoArg0(infoIter), -1);
        sceneObjHolder.modelCache.requestObjectData(AstroMapObj.getModelName(objectName, domeId));
    }

    public static getModelName(objName: string, domeId: number): string {
        if (objName === 'AstroDomeEntrance') {
            const table = [
                'AstroDomeEntranceObservatory',
                'AstroDomeEntranceWell',
                'AstroDomeEntranceKitchen',
                'AstroDomeEntranceBedRoom',
                'AstroDomeEntranceMachine',
                'AstroDomeEntranceTower',
            ];
            return table[domeId - 1];
        } else if (objName === 'AstroStarPlate') {
            const table = [
                'AstroStarPlateObservatory',
                'AstroStarPlateWell',
                'AstroStarPlateKitchen',
                'AstroStarPlateBedRoom',
                'AstroStarPlateMachine',
                'AstroStarPlateTower',
            ];
            return table[domeId - 1];
        } else if (objName === 'AstroDome') {
            const table = [
                'AstroDomeObservatory',
                'AstroDomeWell',
                'AstroDomeKitchen',
                'AstroDomeBedRoom',
                'AstroDomeMachine',
                'AstroDomeTower',
            ];
            return table[domeId - 1];
        } else {
            return objName;
        }
    }
}

export class AstroCore extends MapObjActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo();
        setupInitInfoSimpleMapObj(initInfo);
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);

        // We pick Revival4 because it's the most interesting of the bunch.
        tryStartAllAnim(this, 'Revival4');
    }
}

export class UFOKinokoUnderConstruction extends MapObjActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo();
        setupInitInfoSimpleMapObj(initInfo);
        setupInitInfoColorChangeArg0(initInfo, infoIter);
        setupInitInfoTextureChangeArg1(initInfo, infoIter);
        // Original actor tests isUFOKinokoBeforeConstruction() / isUFOKinokoUnderConstruction()
        // to determine which model to show. Here, we assume the player has unlocked the relevant flag...
        initInfo.setupModelName('UFOKinokoLandingAstro');
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('UFOKinokoLandingAstro');
    }
}

class ChipBase extends LiveActor {
    private airBubble: PartsModel | null = null;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter | null, modelName: string) {
        super(zoneAndLayer, sceneObjHolder, modelName);

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, modelName);
        connectToSceneNoSilhouettedMapObjStrongLight(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, null);
        tryStartAllAnim(this, 'Wait');

        if (infoIter !== null) {
            const isNeedBubble = getJMapInfoBool(fallback(getJMapInfoArg3(infoIter), -1));
            if (isNeedBubble) {
                this.airBubble = createPartsModelNoSilhouettedMapObj(sceneObjHolder, this, "AirBubble");
                tryStartAllAnim(this, "Move");
            }
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);
        const isNeedBubble = getJMapInfoBool(fallback(getJMapInfoArg3(infoIter), -1));
        if (isNeedBubble)
            sceneObjHolder.modelCache.requestObjectData("AirBubble");
    }
}

export class BlueChip extends ChipBase {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter | null) {
        super(zoneAndLayer, sceneObjHolder, infoIter, "BlueChip");
    }
}

export class YellowChip extends ChipBase {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter | null) {
        super(zoneAndLayer, sceneObjHolder, infoIter, "YellowChip");
    }
}

const enum CrystalCageSize { S, M, L }

export class CrystalCage extends LiveActor {
    private size: CrystalCageSize;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);

        if (this.name === 'CrystalCageS')
            this.size = CrystalCageSize.S;
        else if (this.name === 'CrystalCageM')
            this.size = CrystalCageSize.M;
        else if (this.name === 'CrystalCageL')
            this.size = CrystalCageSize.L;

        this.initModelManagerWithAnm(sceneObjHolder, this.name);

        connectToSceneCrystal(sceneObjHolder, this);

        if (this.size === CrystalCageSize.L)
            this.initEffectKeeper(sceneObjHolder, null);

        if (this.size === CrystalCageSize.L) {
            this.makeActorAppeared(sceneObjHolder);
        } else if (isExistStageSwitchSleep(infoIter)) {
            useStageSwitchSleep(sceneObjHolder, this, infoIter);
            this.makeActorDead(sceneObjHolder);
        } else if (useStageSwitchReadAppear(sceneObjHolder, this, infoIter)) {
            syncStageSwitchAppear(sceneObjHolder, this);
            this.makeActorDead(sceneObjHolder);
        } else {
            this.makeActorAppeared(sceneObjHolder);
        }
    }
}

const enum LavaSteamNrv { Wait, Steam }

export class LavaSteam extends LiveActor<LavaSteamNrv> {
    private effectScale = vec3.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'LavaSteam');
        this.initEffectKeeper(sceneObjHolder, null);
        setEffectHostSRT(this, 'Sign', this.translation, this.rotation, this.effectScale);

        this.initNerve(LavaSteamNrv.Wait);

        connectToSceneNoSilhouettedMapObj(sceneObjHolder, this);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: LavaSteamNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === LavaSteamNrv.Wait) {
            if (isFirstStep(this)) {
                emitEffect(sceneObjHolder, this, 'Sign');
                vec3.set(this.effectScale, 1, 1, 1);
            }

            if (isGreaterStep(this, 0x52)) {
                const scale = getEaseInValue((0x5a - this.getNerveStep()) * 0.125, 0.001, 1.0, 1.0);
                vec3.set(this.effectScale, scale, scale, scale);
            }

            if (isGreaterStep(this, 0x5a)) {
                forceDeleteEffect(sceneObjHolder, this, 'Sign');
            }

            if (isGreaterStep(this, 0x78)) {
                this.setNerve(LavaSteamNrv.Steam);
            }
        } else if (currentNerve === LavaSteamNrv.Steam) {
            if (isFirstStep(this)) {
                emitEffect(sceneObjHolder, this, 'Steam');
            }

            if (isGreaterStep(this, 0x5a)) {
                deleteEffect(sceneObjHolder, this, 'Steam');
                this.setNerve(LavaSteamNrv.Wait);
            }
        }
    }
}

export class SignBoard extends NPCActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        const objName = this.name;
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, objName);
        connectToSceneNpc(sceneObjHolder, this);
    }
}

export class WoodBox extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, "WoodBox");
        connectToSceneMapObjStrongLight(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initEffectKeeper(sceneObjHolder, null);
    }
}

export class SurprisedGalaxy extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, "MiniSurprisedGalaxy");
        connectToSceneMapObj(sceneObjHolder, this);
        startAction(this, 'MiniSurprisedGalaxy');
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData("MiniSurprisedGalaxy");
    }
}

class SuperSpinDriver extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter, colorArg: number) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, "SuperSpinDriver");
        connectToSceneNoSilhouettedMapObjStrongLight(sceneObjHolder, this);

        this.initColor(colorArg);
        startBck(this, 'Wait');
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData("SuperSpinDriver");
    }

    private initColor(colorArg: number): void {
        startBtp(this, 'SuperSpinDriver');
        setBtpFrameAndStop(this, colorArg);

        if (colorArg === 0) {
            startBrk(this, 'Yellow');
        } else if (colorArg === 1) {
            startBrk(this, 'Green');
        } else {
            startBrk(this, 'Pink');
        }
    }
}

export function requestArchivesSuperSpinDriver(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
    SuperSpinDriver.requestArchives(sceneObjHolder, infoIter);
}

export function createSuperSpinDriverYellow(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): SuperSpinDriver {
    return new SuperSpinDriver(zoneAndLayer, sceneObjHolder, infoIter, 0);
}

export function createSuperSpinDriverGreen(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): SuperSpinDriver {
    return new SuperSpinDriver(zoneAndLayer, sceneObjHolder, infoIter, 1);
}

export function createSuperSpinDriverPink(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): SuperSpinDriver {
    return new SuperSpinDriver(zoneAndLayer, sceneObjHolder, infoIter, 2);
}

class WaveFloatingForce {
    private theta: number;

    constructor(private frequency: number, private amplitude: number) {
        this.theta = Math.random() * MathConstants.TAU;
    }

    public update(deltaTime: number): void {
        this.theta += (MathConstants.TAU / this.frequency) * deltaTime;
        this.theta = this.theta % MathConstants.TAU;
    }

    public getCurrentValue(): number {
        return this.amplitude * Math.sin(this.theta);
    }
}

export class OceanWaveFloater extends MapObjActor {
    private waveForce: WaveFloatingForce;
    private upVec: vec3;
    private isRippling: boolean;
    private rippleStopThreshold: number;
    private rippleStartThreshold: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo();
        initInfo.setupDefaultPos();
        initInfo.setupConnectToScene();
        initInfo.setupEffect(null);
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);

        let frequency: number, amplitude: number;
        if (this.name === 'OceanPierFloaterA') {
            frequency = 300;
            amplitude = 30;
            this.rippleStopThreshold = 140;
            this.rippleStartThreshold = 120;
        } else if (this.name === 'OceanHexagonFloater') {
            frequency = 330;
            amplitude = 50;
            this.rippleStopThreshold = 150;
            this.rippleStartThreshold = 100;
        } else {
            throw "whoops";
        }

        this.waveForce = new WaveFloatingForce(frequency, amplitude);

        setEffectHostSRT(this, 'Ripple', this.translation, null, null);

        this.upVec = vec3.create();
        calcUpVec(this.upVec, this);

        // For now.
        vec3.negate(this.gravityVector, this.upVec);

        this.isRippling = false;
    }

    private getCurrentSinkDepth(): number {
        mat4.getTranslation(scratchVec3, this.getBaseMtx()!);
        vec3.subtract(scratchVec3, this.translation, scratchVec3);
        return vec3.length(scratchVec3) * Math.sign(vec3.dot(scratchVec3, this.gravityVector));
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.calcAndSetBaseMtx(sceneObjHolder, viewerInput);

        vec3.scale(scratchVec3, this.gravityVector, this.waveForce.getCurrentValue());
        mat4.translate(this.modelInstance!.modelMatrix, this.modelInstance!.modelMatrix, scratchVec3);
    }

    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.control(sceneObjHolder, viewerInput);

        this.waveForce.update(getDeltaTimeFrames(viewerInput));

        // controlEffect
        const sinkDepth = this.getCurrentSinkDepth();
        if (sinkDepth <= this.rippleStopThreshold || !this.isRippling) {
            if (sinkDepth < this.rippleStartThreshold && !this.isRippling) {
                emitEffect(sceneObjHolder, this, 'Ripple');
                this.isRippling = true;
            }
        } else {
            deleteEffect(sceneObjHolder, this, 'Ripple');
            this.isRippling = false;
        }
    }
}

const enum FishNrv { Approach, Wander }

class Fish extends LiveActor<FishNrv> {
    private followPointPos = vec3.create();
    private offset = vec3.create();
    private direction = vec3.create();
    private counter = 0;
    private approachThreshold: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, private fishGroup: FishGroup, modelName: string) {
        super(zoneAndLayer, sceneObjHolder, modelName);

        vec3.set(this.offset, getRandomFloat(-150, 150), getRandomFloat(-150, 150), getRandomFloat(-150, 150));
        this.approachThreshold = getRandomFloat(100, 500);

        this.updateFollowPointPos();
        vec3.copy(this.translation, this.followPointPos);
        getRailDirection(this.direction, this.fishGroup);

        this.initModelManagerWithAnm(sceneObjHolder, modelName);
        startBck(this, 'Swim');

        this.initNerve(FishNrv.Wander);

        connectToSceneEnvironment(sceneObjHolder, this);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: FishNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === FishNrv.Approach) {
            if (isFirstStep(this))
                this.counter = 0;

            --this.counter;
            if (this.counter < 1) {
                vec3.sub(scratchVec3, this.followPointPos, this.translation);
                vec3.normalize(scratchVec3, scratchVec3);

                if (vec3.dot(scratchVec3, this.direction) <= 0.9) {
                    vec3.lerp(this.direction, this.direction, scratchVec3, 0.8);

                    if (isNearZeroVec3(this.direction, 0.01))
                        vec3.copy(this.direction, scratchVec3);
                    else
                        vec3.normalize(this.direction, this.direction);
                } else {
                    vec3.copy(this.direction, scratchVec3);
                }

                vec3.scaleAndAdd(this.velocity, this.velocity, this.direction, 5);
                this.counter = getRandomInt(5, 30);
            }

            if (vec3.squaredDistance(this.followPointPos, this.translation) < (this.approachThreshold * this.approachThreshold))
                this.setNerve(FishNrv.Wander);
        } else if (currentNerve === FishNrv.Wander) {
            if (isFirstStep(this))
                this.counter = 0;

            --this.counter;
            if (this.counter < 1) {
                vec3.add(this.velocity, this.velocity, this.direction);
                this.counter = getRandomInt(60, 180);
            }

            if (vec3.squaredDistance(this.followPointPos, this.translation) > (this.approachThreshold * this.approachThreshold))
                this.setNerve(FishNrv.Approach);
        }
    }

    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.control(sceneObjHolder, viewerInput);

        vec3.scale(this.velocity, this.velocity, 0.95);

        setBckRate(this, 0.2 * vec3.length(this.velocity));

        if (isNearZeroVec3(this.direction, 0.001)) {
            if (isNearZeroVec3(this.velocity, 0.001)) {
                vec3.set(this.direction, 1, 0, 0);
            } else {
                vec3.copy(this.direction, this.velocity);
            }
        }

        this.updateFollowPointPos();
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        makeMtxFrontUpPos(this.modelInstance!.modelMatrix, this.direction, this.fishGroup.upVec, this.translation);
    }

    private updateFollowPointPos(): void {
        getRailPos(this.followPointPos, this.fishGroup);
        vec3.add(this.followPointPos, this.followPointPos, this.offset);
    }
}

export class FishGroup extends LiveActor {
    private railSpeed: number = 5;
    private fish: Fish[] = [];
    public upVec = vec3.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        const fishCount = fallback(getJMapInfoArg0(infoIter), 10);

        initDefaultPos(sceneObjHolder, this, infoIter);
        calcActorAxis(null, this.upVec, null, this);
        this.initRailRider(sceneObjHolder, infoIter);
        moveCoordAndTransToNearestRailPos(this);

        const modelName = FishGroup.getArchiveName(infoIter);
        for (let i = 0; i < fishCount; i++)
            this.fish.push(new Fish(zoneAndLayer, sceneObjHolder, this, modelName));

        connectToSceneEnemyMovement(sceneObjHolder, this);
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);

        // Update up vector from gravity vector
        vec3.negate(this.upVec, this.gravityVector);

        moveCoordAndFollowTrans(this, this.railSpeed * getDeltaTimeFrames(viewerInput));

        // this.railRider!.debugDrawRail(viewerInput.camera, 50);
    }

    private static getArchiveName(infoIter: JMapInfoIter): string {
        const actorName = getObjectName(infoIter);

        if (actorName === 'FishGroupA')
            return 'FishA';
        else if (actorName === 'FishGroupB')
            return 'FishB';
        else if (actorName === 'FishGroupC')
            return 'FishC';
        else if (actorName === 'FishGroupD')
            return 'FishD';
        else if (actorName === 'FishGroupE')
            return 'FishE';
        else if (actorName === 'FishGroupF')
            return 'FishF';

        throw "whoops";
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData(FishGroup.getArchiveName(infoIter));
    }
}

const enum SeaGullNrv { HoverFront, HoverLeft, HoverRight }

function explerp(dst: vec3, target: vec3, k: number): void {
    dst[0] += (target[0] - dst[0]) * k;
    dst[1] += (target[1] - dst[1]) * k;
    dst[2] += (target[2] - dst[2]) * k;
}

class SeaGull extends LiveActor<SeaGullNrv> {
    private direction: boolean;
    private updatePosCounter: number;
    private axisX = vec3.create();
    private axisY = vec3.create();
    private axisZ = vec3.create();
    private upVec = vec3.create();
    private chasePointIndex: number;
    private bankRotation: number = 0;
    private hoverStep: number = 0;
    private flyUpCounter: number = 0;
    private maintainHeightCounter: number = 0;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, private seaGullGroup: SeaGullGroup, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        this.calcGravityFlag = true;
        initDefaultPos(sceneObjHolder, this, infoIter);
        calcActorAxis(this.axisX, this.axisY, this.axisZ, this);
        vec3.copy(this.upVec, this.axisY);

        this.initModelManagerWithAnm(sceneObjHolder, 'SeaGull');
        startBck(this, 'Fly');
        connectToSceneEnvironment(sceneObjHolder, this);

        const totalLength = getRailTotalLength(this.seaGullGroup);
        const coord = getRandomFloat(1.0, totalLength - 1.0);
        this.chasePointIndex = (coord / 500.0) | 0;
        calcRailPosAtCoord(this.translation, this.seaGullGroup, coord);

        this.direction = isHalfProbability();
        this.updatePosCounter = getRandomInt(0, 180);

        this.chasePointIndex = this.seaGullGroup.updatePosInfoIndex(this.chasePointIndex, this.direction);

        vec3.scale(scratchVec3a, this.axisX, getRandomFloat(-1.0, 1.0));
        vec3.scale(scratchVec3b, this.axisZ, getRandomFloat(-1.0, 1.0));

        vec3.add(this.axisZ, scratchVec3a, scratchVec3b);
        vec3.normalize(this.axisZ, this.axisZ);

        this.initNerve(SeaGullNrv.HoverFront);
    }

    private updateHover(deltaTimeFrames: number): void {
        if (Math.abs(this.bankRotation) > 0.01) {
            vec3.negate(this.upVec, this.gravityVector);

            this.bankRotation = clampRange(this.bankRotation, 30);

            mat4.fromRotation(scratchMatrix, MathConstants.DEG_TO_RAD * this.bankRotation, this.axisZ);
            vec3.transformMat4(this.axisY, this.upVec, scratchMatrix);

            mat4.fromRotation(scratchMatrix, MathConstants.DEG_TO_RAD * -0.01 * this.bankRotation * deltaTimeFrames, this.upVec);
            vec3.transformMat4(this.axisZ, this.axisZ, scratchMatrix);
        }

        vec3.scaleAndAdd(this.velocity, this.velocity, this.axisZ, 0.05);

        if (this.flyUpCounter < 1) {
            this.velocity[1] -= 0.005;

            const chasePoint = this.seaGullGroup.points[this.chasePointIndex];
            vec3.sub(scratchVec3, chasePoint, this.translation);
            const dist = vec3.dot(scratchVec3, this.upVec);
            if (dist >= 500.0) {
                --this.maintainHeightCounter;
                if (dist > 500.0 || this.maintainHeightCounter < 1)
                    this.flyUpCounter = getRandomInt(30, 180);
            } else {
                this.maintainHeightCounter = 300;
            }
        } else {
            vec3.scaleAndAdd(this.velocity, this.velocity, this.axisY, 0.04);
            --this.flyUpCounter;
            if (this.flyUpCounter < 1)
                this.maintainHeightCounter = getRandomInt(60, 300);
        }
    }

    private debugDraw(viewerInput: Viewer.ViewerRenderInput): void {
        const ctx = getDebugOverlayCanvas2D();

        this.seaGullGroup.railRider!.debugDrawRailLine(viewerInput.camera, 50);

        drawWorldSpaceBasis(ctx, viewerInput.camera, this.getBaseMtx()!);

        for (let i = 0; i < this.seaGullGroup.points.length; i++) {
            const p = this.seaGullGroup.points[i];
            if (i === this.chasePointIndex)
                drawWorldSpacePoint(ctx, viewerInput.camera, p, Green, 10);
            else
                drawWorldSpacePoint(ctx, viewerInput.camera, p, Yellow, 4);
        }

        if (this.getCurrentNerve() === SeaGullNrv.HoverFront)
            drawWorldSpacePoint(ctx, viewerInput.camera, this.translation, OpaqueBlack, 10);
        else if (this.getCurrentNerve() === SeaGullNrv.HoverRight)
            drawWorldSpacePoint(ctx, viewerInput.camera, this.translation, Green, 10);
        else if (this.getCurrentNerve() === SeaGullNrv.HoverLeft)
            drawWorldSpacePoint(ctx, viewerInput.camera, this.translation, Red, 10);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: SeaGullNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === SeaGullNrv.HoverFront) {
            if (isFirstStep(this))
                this.hoverStep = getRandomInt(0, 60);

            this.bankRotation *= Math.pow(0.995, deltaTimeFrames);
            if (isGreaterStep(this, this.hoverStep)) {
                const chasePoint = this.seaGullGroup.points[this.chasePointIndex];
                vec3.subtract(scratchVec3, chasePoint, this.translation);
                if (vec3.squaredLength(scratchVec3) > 500) {
                    const p = vec3.dot(this.axisX, scratchVec3);
                    if (p <= 0)
                        this.setNerve(SeaGullNrv.HoverRight);
                    else
                        this.setNerve(SeaGullNrv.HoverLeft);
                }
            }
        } else if (currentNerve === SeaGullNrv.HoverLeft) {
            if (isFirstStep(this))
                this.hoverStep = getRandomInt(60, 120);

            this.bankRotation -= 0.1 * deltaTimeFrames;

            if (isGreaterStep(this, this.hoverStep))
                this.setNerve(SeaGullNrv.HoverFront);
        } else if (currentNerve === SeaGullNrv.HoverRight) {
            if (isFirstStep(this))
                this.hoverStep = getRandomInt(60, 120);

            this.bankRotation += 0.1 * deltaTimeFrames;

            if (isGreaterStep(this, this.hoverStep))
                this.setNerve(SeaGullNrv.HoverFront);
        }
    }

    private dryBirdCam = false;
    private cameraCenter = vec3.create();
    private cameraEye = vec3.create();
    private cameraK = 1/8;
    private currentZoom = 1000;
    private camera(k: number = this.cameraK): void {
        // Camera hax
        vec3.copy(scratchVec3a, this.axisZ);
        vec3.set(scratchVec3b, 0, 1, 0);

        // XZ plane
        vecKillElement(scratchVec3c, scratchVec3a, scratchVec3b);
        // Jam the direction vector by this a ton to smooth out the Y axis.
        vec3.scaleAndAdd(scratchVec3a, scratchVec3a, scratchVec3c, 1);
        vec3.normalize(scratchVec3a, scratchVec3a);

        vec3.scaleAndAdd(scratchVec3a, this.translation, scratchVec3a, -this.currentZoom);
        scratchVec3a[1] += 500;

        explerp(this.cameraEye, scratchVec3a, k);
        explerp(this.cameraCenter, this.translation, k);
    }

    private debug = false;
    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        if (this.dryBirdCam) {
            this.camera();

            const camera = viewerInput.camera;
            mat4.lookAt(camera.viewMatrix, this.cameraEye, this.cameraCenter, scratchVec3b);
            mat4.invert(camera.worldMatrix, camera.viewMatrix);
            camera.worldMatrixUpdated();
        }

        if (this.debug)
            this.debugDraw(viewerInput);

        super.control(sceneObjHolder, viewerInput);

        this.updateHover(getDeltaTimeFrames(viewerInput));

        vec3.scale(this.velocity, this.velocity, 0.99);

        if (vec3.squaredLength(this.velocity) > 10*10)
            normToLength(this.velocity, 10);

        vec3.cross(this.axisX, this.axisY, this.axisZ);
        vec3.normalize(this.axisX, this.axisX);

        vec3.cross(this.axisY, this.axisZ, this.axisX);
        vec3.normalize(this.axisY, this.axisY);

        --this.updatePosCounter;
        if (this.updatePosCounter < 1) {
            this.chasePointIndex = this.seaGullGroup.updatePosInfoIndex(this.chasePointIndex, this.direction);
            this.updatePosCounter = 180;
        }

        // Debugging
        /*
        const ctx = getDebugOverlayCanvas2D();
        const chasePoint = this.seaGullGroup.points[this.chasePointIndex];
        drawWorldSpacePoint(ctx, viewerInput.camera, chasePoint, Magenta, 10);

        vec3.scaleAndAdd(scratchVec3, this.translation, this.axisX, 20);
        drawWorldSpaceLine(ctx, viewerInput.camera, this.translation, scratchVec3, Red);

        vec3.scaleAndAdd(scratchVec3, this.translation, this.axisY, 20);
        drawWorldSpaceLine(ctx, viewerInput.camera, this.translation, scratchVec3, Green);

        vec3.scaleAndAdd(scratchVec3, this.translation, this.axisZ, 20);
        drawWorldSpaceLine(ctx, viewerInput.camera, this.translation, scratchVec3, Blue);
        */
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        setMtxAxisXYZ(this.modelInstance!.modelMatrix, this.axisX, this.axisY, this.axisZ);
        setMatrixTranslation(this.modelInstance!.modelMatrix, this.translation);
    }
}

export class SeaGullGroup extends LiveActor {
    private seaGulls: SeaGull[] = [];
    public points: vec3[] = [];

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        const seaGullCount = fallback(getJMapInfoArg0(infoIter), 10);

        this.initRailRider(sceneObjHolder, infoIter);
        getRailPos(this.translation, this);
        const railTotalLength = getRailTotalLength(this);
        const pointCount = ((railTotalLength / 500.0) | 0) + 1;
        const pointDist = railTotalLength / pointCount;

        for (let i = 0; i < pointCount; i++) {
            const point = vec3.create();
            calcRailPosAtCoord(point, this, pointDist * i);
            this.points.push(point);
        }

        for (let i = 0; i < seaGullCount; i++)
            this.seaGulls.push(new SeaGull(zoneAndLayer, sceneObjHolder, this, infoIter));
    }

    public updatePosInfoIndex(index: number, direction: boolean): number {
        const step = direction ? -1 : 1;
        return mod(index + step, this.points.length);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('SeaGull');
    }
}

class CoconutTreeLeaf extends LiveActor {
    private axisX = vec3.create();
    private axisY = vec3.create();
    private axisZ = vec3.create();
    private upVec = vec3.create();
    private currFrontChase = vec3.create();
    private origFrontChase = vec3.create();
    private accelCounter = 0;
    private waitCounter = 0;
    private accel = vec3.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, private leafGroup: CoconutTreeLeafGroup, private jointMtx: mat4, private treeAxisZ: vec3) {
        super(zoneAndLayer, sceneObjHolder, 'CoconutTreeLeaf');

        this.initHitSensor();
        addBodyMessageSensorMapObj(sceneObjHolder, this);

        calcMtxAxis(this.axisX, this.axisY, this.axisZ, this.jointMtx);
        vec3.copy(this.upVec, this.axisY);

        getMatrixTranslation(this.translation, this.jointMtx);

        vec3.scaleAndAdd(this.origFrontChase, this.translation, this.axisZ, 100.0);
        vec3.copy(this.currFrontChase, this.origFrontChase);
    }

    public getBaseMtx(): mat4 {
        return this.jointMtx;
    }

    public update(scaleZ: number, scaleX: number, deltaTimeFrames: number): void {
        const isOnPlayer = false;

        let velUp: number, velDrag: number, velChase: number;
        if (isOnPlayer) {
            velUp = 0.2;
            velDrag = 0.95;
            velChase = 0.01;
        } else {
            velUp = 0.005;
            velDrag = 0.99;
            velChase = 0.001;

            if (this.accelCounter < 1) {
                --this.waitCounter;

                if (this.waitCounter < 1) {
                    vec3.scale(this.accel, this.treeAxisZ, scaleZ);
                    vec3.scaleAndAdd(this.accel, this.accel, this.upVec, scaleX * getRandomFloat(-1.0, 1.0));
                    this.accelCounter = getRandomFloat(10, 30);
                }
            } else {
                vec3.add(this.velocity, this.velocity, this.accel);
                --this.accelCounter;
                if (this.accelCounter < 1)
                    this.waitCounter = getRandomInt(15, 150);
            }
        }

        vec3.scaleAndAdd(this.velocity, this.velocity, this.upVec, -velUp);

        vec3.sub(scratchVec3, this.origFrontChase, this.currFrontChase);
        const mag = -vec3.dot(scratchVec3, this.treeAxisZ);
        vec3.scaleAndAdd(this.velocity, this.velocity, scratchVec3, velChase);

        vec3.scale(this.velocity, this.velocity, velDrag);
        vec3.scaleAndAdd(this.currFrontChase, this.currFrontChase, this.velocity, deltaTimeFrames);
        vec3.sub(this.axisZ, this.currFrontChase, this.translation);
        vec3.normalize(this.axisZ, this.axisZ);

        vec3.scaleAndAdd(scratchVec3, this.upVec, this.treeAxisZ, Math.max(0.0, 0.01 * mag));
        vec3.cross(this.axisX, scratchVec3, this.axisZ);
        vec3.normalize(this.axisX, this.axisX);

        vec3.cross(this.axisY, this.axisZ, this.axisX);
        vec3.normalize(this.axisY, this.axisY);

        setMtxAxisXYZ(this.jointMtx, this.axisX, this.axisY, this.axisZ);
    }
}

export class CoconutTreeLeafGroup extends LiveActor {
    private leaves: CoconutTreeLeaf[] = [];
    private axisZ = vec3.fromValues(0, 0, 1);

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'CoconutTreeLeaf');
        connectToSceneMapObjNoCalcAnim(sceneObjHolder, this);

        for (let i = 1; i < getJointNum(this); i++) {
            const jointMtx = getJointMtx(this, i);
            this.leaves.push(new CoconutTreeLeaf(zoneAndLayer, sceneObjHolder, this, jointMtx, this.axisZ));
        }
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);

        const dist = calcDistanceToPlayer(this, viewerInput.camera);
        let a = 0, b = 0;

        if (dist > 5000.0) {
            a = 0.05;
            b = 0.03;
        } else if (dist > 3000.0) {
            a = 0.03;
            b = 0.01;
        } else {
            a = 0.02;
            b = 0.005;
        }

        const deltaTimeFrames = getDeltaTimeFrames(viewerInput);
        for (let i = 0; i < this.leaves.length; i++)
            this.leaves[i].update(a, b, deltaTimeFrames);
    }
}

const enum AirBubbleNrv { Wait, Move, KillWait }

export class AirBubble extends LiveActor<AirBubbleNrv> {
    private lifetime: number = 180;
    private spawnLocation = vec3.create();
    private accel = vec3.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter | null) {
        super(zoneAndLayer, sceneObjHolder, `AirBubble`);

        initDefaultPos(sceneObjHolder, this, infoIter);
        vec3.copy(this.spawnLocation, this.translation);
        this.initModelManagerWithAnm(sceneObjHolder, 'AirBubble');
        connectToSceneItem(sceneObjHolder, this);

        this.initEffectKeeper(sceneObjHolder, null);
        this.initNerve(AirBubbleNrv.Wait);

        startBck(this, 'Move');
    }

    public appearMove(sceneObjHolder: SceneObjHolder, pos: vec3, lifetime: number): void {
        vec3.copy(this.translation, pos);
        this.makeActorAppeared(sceneObjHolder);
        showModel(this);
        this.setNerve(AirBubbleNrv.Move);

        if (lifetime <= 0)
            lifetime = 180;

        this.lifetime = lifetime;
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: AirBubbleNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === AirBubbleNrv.Wait) {
            // Nothing.
        } else if (currentNerve === AirBubbleNrv.Move) {
            if (isFirstStep(this)) {
                calcGravity(sceneObjHolder, this);

                vec3.negate(scratchVec3, this.gravityVector);
                vec3.scale(this.velocity, scratchVec3, 7.0);
            }

            mat4.fromRotation(scratchMatrix, MathConstants.DEG_TO_RAD * 1.5, this.gravityVector);
            vec3.transformMat4(this.accel, this.accel, scratchMatrix);
            vec3.scaleAndAdd(this.accel, this.accel, this.gravityVector, -vec3.dot(this.gravityVector, this.accel));
            if (isNearZeroVec3(this.accel, 0.001))
                getRandomVector(this.accel, 1.0);
            vec3.normalize(this.accel, this.accel);

            vec3.scaleAndAdd(this.velocity, this.velocity, this.accel, 0.1);
            vec3.scaleAndAdd(this.velocity, this.velocity, this.gravityVector, -0.3);

            vec3.scale(this.velocity, this.velocity, 0.85);
            if (isGreaterStep(this, this.lifetime)) {
                hideModel(this);
                emitEffect(sceneObjHolder, this, 'RecoveryBubbleBreak');
                this.setNerve(AirBubbleNrv.KillWait);
            }
        } else if (currentNerve === AirBubbleNrv.KillWait) {
            if (isGreaterStep(this, 90))
                this.makeActorDead(sceneObjHolder);
        }
    }
}

export class AirBubbleHolder extends LiveActorGroup<AirBubble> {
    constructor(sceneObjHolder: SceneObjHolder) {
        super(sceneObjHolder, 'AirBubbleHolder', 0x40);

        for (let i = 0; i < 0x20; i++) {
            const bubble = new AirBubble(dynamicSpawnZoneAndLayer, sceneObjHolder, null);
            bubble.makeActorDead(sceneObjHolder);
            this.registerActor(bubble);
        }
    }

    public appearAirBubble(sceneObjHolder: SceneObjHolder, pos: vec3, lifetime: number): void {
        const bubble = this.getDeadActor();
        if (bubble !== null)
            bubble.appearMove(sceneObjHolder, pos, lifetime);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('AirBubble');
    }
}

const enum AirBubbleGeneratorNrv { Wait, Generate }

export class AirBubbleGenerator extends LiveActor<AirBubbleGeneratorNrv> {
    private delay: number;
    private lifetime: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        createSceneObj(sceneObjHolder, SceneObj.AirBubbleHolder);

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'AirBubbleGenerator');
        connectToSceneNoSilhouettedMapObj(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, null);
        this.initNerve(AirBubbleGeneratorNrv.Wait);

        this.delay = fallback(getJMapInfoArg0(infoIter), 180);
        this.lifetime = fallback(getJMapInfoArg1(infoIter), -1);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: AirBubbleGeneratorNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === AirBubbleGeneratorNrv.Wait) {
            if (isGreaterStep(this, this.delay))
                this.setNerve(AirBubbleGeneratorNrv.Generate);
        } else if (currentNerve === AirBubbleGeneratorNrv.Generate) {
            if (isFirstStep(this)) {
                startBck(this, 'Generate');
            }

            if (isGreaterStep(this, 6)) {
                calcActorAxis(null, scratchVec3, null, this);
                vec3.scaleAndAdd(scratchVec3, this.translation, scratchVec3, 120);
                sceneObjHolder.airBubbleHolder!.appearAirBubble(sceneObjHolder, scratchVec3, this.lifetime);
                this.setNerve(AirBubbleGeneratorNrv.Wait);
            }
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);
        AirBubbleHolder.requestArchives(sceneObjHolder, infoIter);
    }
}

const enum TreasureBoxType {
    Normal, Cracked, Gold,
}

const enum TreasureBoxNrv { Wait, AlwaysOpen }

export class TreasureBoxCracked extends LiveActor<TreasureBoxNrv> {
    private type: TreasureBoxType;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);

        this.type = TreasureBoxCracked.getBoxType(infoIter);

        if (this.type === TreasureBoxType.Cracked)
            this.initModelManagerWithAnm(sceneObjHolder, 'TreasureBoxCracked');
        else if (this.type === TreasureBoxType.Gold)
            this.initModelManagerWithAnm(sceneObjHolder, 'TreasureBoxGold');
        else
            this.initModelManagerWithAnm(sceneObjHolder, 'TreasureBox');

        connectToSceneMapObjStrongLight(sceneObjHolder, this);

        this.initEffectKeeper(sceneObjHolder, null);

        const arg2 = fallback(getJMapInfoArg2(infoIter), 0);
        if (arg2 === 2) {
            this.initNerve(TreasureBoxNrv.AlwaysOpen);
        } else {
            this.initNerve(TreasureBoxNrv.Wait);
        }
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: TreasureBoxNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === TreasureBoxNrv.Wait) {
            if (this.type === TreasureBoxType.Cracked) {
                startBrk(this, `Wait`);
                emitEffect(sceneObjHolder, this, `Light`);
            } else if (this.type === TreasureBoxType.Gold) {
                emitEffect(sceneObjHolder, this, `Gold`);
            }
        } else if (currentNerve === TreasureBoxNrv.AlwaysOpen) {
            // TODO(jstpierre): Go to end of Bck animation.
        }
    }

    public static getBoxType(infoIter: JMapInfoIter): TreasureBoxType {
        const objectName = getObjectName(infoIter);

        if (objectName.includes('TreasureBoxCracked'))
            return TreasureBoxType.Cracked;
        else if (objectName.includes('TreasureBoxGold'))
            return TreasureBoxType.Gold;
        else
            return TreasureBoxType.Normal;
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        const objectName = getObjectName(infoIter);

        if (objectName.includes('TreasureBoxCracked'))
            sceneObjHolder.modelCache.requestObjectData('TreasureBoxCracked');
        else if (objectName.includes('TreasureBoxGold'))
            sceneObjHolder.modelCache.requestObjectData('TreasureBoxGold');
        else
            sceneObjHolder.modelCache.requestObjectData('TreasureBox');
    }
}

const enum TicoRailNrv { Wait, LookAround, MoveSignAndTurn, MoveSign, Move, Stop, TalkStart, Talk, TalkCancel, GoodBye }

export class TicoRail extends LiveActor<TicoRailNrv> {
    public direction = vec3.create();
    private talkingActor: LiveActor | null = null;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, `Tico`);
        connectToSceneNpc(sceneObjHolder, this);
        this.initHitSensor();
        addHitSensorNpc(sceneObjHolder, this, 'body', 8, 50.0, vec3.fromValues(0, 50.0, 0));
        this.hitSensorKeeper!.validateBySystem();
        this.initLightCtrl(sceneObjHolder);
        this.initEffectKeeper(sceneObjHolder, null);
        this.initRailRider(sceneObjHolder, infoIter);
        moveCoordAndTransToNearestRailPos(this);
        getRailDirection(this.direction, this);
        const colorChangeFrame = fallback(getJMapInfoArg0(infoIter), 0);
        startBrk(this, 'ColorChange');
        setBrkFrameAndStop(this, colorChangeFrame);

        const rnd = getRandomInt(0, 2);
        if (rnd === 0)
            this.initNerve(TicoRailNrv.Wait);
        else
            this.initNerve(TicoRailNrv.Move);
    }

    public attackSensor(sceneObjHolder: SceneObjHolder, thisSensor: HitSensor, otherSensor: HitSensor): void {
        if (isSensorPlayer(otherSensor)) {
            // sendMsgPush
        } else if (isSensorNpc(otherSensor)) {
            const currentNerve = this.getCurrentNerve();
            if (currentNerve !== TicoRailNrv.TalkStart && currentNerve !== TicoRailNrv.Talk && currentNerve !== TicoRailNrv.TalkCancel && currentNerve !== TicoRailNrv.GoodBye) {
                if (sendArbitraryMsg(sceneObjHolder, MessageType.TicoRail_StartTalk, otherSensor, thisSensor)) {
                    this.talkingActor = otherSensor.actor;
                    this.setNerve(TicoRailNrv.TalkStart);
                } else {
                    // If we're going in the same direction, no need to do anything.
                    if (isExistRail(otherSensor.actor) && isRailGoingToEnd(this) === isRailGoingToEnd(otherSensor.actor))
                        return;

                    this.setNerve(TicoRailNrv.TalkCancel);
                }
            }
        }
    }

    private isSameRailActor(other: LiveActor): boolean {
        if (!isExistRail(other))
            return false;

        return vec3.equals(getRailPointPosStart(this), getRailPointPosStart(other)) && vec3.equals(getRailPointPosEnd(this), getRailPointPosEnd(other));
    }

    public receiveMessage(sceneObjHolder: SceneObjHolder, messageType: MessageType, thisSensor: HitSensor | null, otherSensor: HitSensor | null): boolean {
        if (messageType === MessageType.TicoRail_StartTalk) {
            const currentNerve = this.getCurrentNerve();

            if (currentNerve !== TicoRailNrv.TalkStart && currentNerve !== TicoRailNrv.Talk && currentNerve !== TicoRailNrv.TalkCancel && currentNerve !== TicoRailNrv.GoodBye) {
                if (this.isSameRailActor(otherSensor!.actor)) {
                    const rnd = getRandomInt(0, 2);
                    if (rnd !== 0) {
                        const dist = calcDistanceVertical(this, otherSensor!.actor.translation);
                        if (dist <= 30) {
                            this.talkingActor = otherSensor!.actor;
                            this.setNerve(TicoRailNrv.TalkStart);
                            return true;
                        }
                    }
                }
            }

            return false;
        } else {
            return super.receiveMessage(sceneObjHolder, messageType, thisSensor, otherSensor);
        }
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        // Gravity vector
        calcMtxFromGravityAndZAxis(this.modelInstance!.modelMatrix, this, this.gravityVector, this.direction);
    }

    private isGreaterEqualStepAndRandom(v: number): boolean {
        if (isGreaterStep(this, v + 300))
            return true;

        if (isGreaterStep(this, v)) {
            if (getRandomInt(0, 300) === 0)
                return true;
        }

        return false;
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: TicoRailNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === TicoRailNrv.Wait) {
            if (isFirstStep(this)) {
                startBck(this, `Turn`);
            }

            if (this.isGreaterEqualStepAndRandom(60))
                this.setNerve(TicoRailNrv.LookAround);
        } else if (currentNerve === TicoRailNrv.LookAround) {
            if (isFirstStep(this)) {
                tryStartBck(this, `Turn`);
            }

            calcUpVec(scratchVec3, this);

            let turnAmt;
            if (isLessStep(this, 40))
                turnAmt = 1.2;
            else if (isLessStep(this, 120))
                turnAmt = -1.2;
            else if (isLessStep(this, 160))
                turnAmt = 1.2;
            else
                turnAmt = 0.0;
            turnAmt *= deltaTimeFrames;
            rotateVecDegree(this.direction, scratchVec3, turnAmt);

            if (isGreaterStep(this, 160)) {
                const rnd = getRandomInt(0, 2);
                if (rnd === 0)
                    this.setNerve(TicoRailNrv.MoveSignAndTurn);
                else
                    this.setNerve(TicoRailNrv.MoveSign);
            }
        } else if (currentNerve === TicoRailNrv.MoveSign || currentNerve === TicoRailNrv.MoveSignAndTurn) {
            if (isFirstStep(this)) {
                startBck(this, `Spin`);

                if (currentNerve === TicoRailNrv.MoveSignAndTurn)
                    reverseRailDirection(this);
            }

            const duration = getBckFrameMax(this);
            const rate = calcNerveRate(this, duration);

            getRailDirection(scratchVec3a, this);
            vec3.negate(scratchVec3b, scratchVec3a);
            vec3.lerp(this.direction, scratchVec3b, scratchVec3a, rate);

            if (isBckStopped(this))
                this.setNerve(TicoRailNrv.Move);
        } else if (currentNerve === TicoRailNrv.Move) {
            if (isFirstStep(this)) {
                tryStartBck(this, `Wait`);
            }

            const speed = deltaTimeFrames * calcNerveValue(this, 0, 200, 15);
            moveCoordAndFollowTrans(this, speed);

            getRailDirection(this.direction, this);
            if (this.isGreaterEqualStepAndRandom(500))
                this.setNerve(TicoRailNrv.Stop);
        } else if (currentNerve === TicoRailNrv.Stop) {
            if (isFirstStep(this))
                startBck(this, `Spin`);

            const duration = getBckFrameMax(this);
            const speed = deltaTimeFrames * calcNerveValue(this, duration, 15, 0);
            moveCoordAndFollowTrans(this, speed);
            if (isBckStopped(this))
                this.setNerve(TicoRailNrv.Wait);
        } else if (currentNerve === TicoRailNrv.TalkCancel) {
            if (isFirstStep(this))
                tryStartBck(this, `Spin`);

            moveCoordAndFollowTrans(this, deltaTimeFrames * 15);
            getRailDirection(this.direction, this);
            if (isBckStopped(this))
                this.setNerve(TicoRailNrv.Move);
        } else if (currentNerve === TicoRailNrv.TalkStart) {
            vec3.sub(scratchVec3a, this.talkingActor!.translation, this.translation);
            vec3.normalize(scratchVec3a, scratchVec3a);

            if (isFirstStep(this)) {
                startBck(this, `Spin`);
                getRailDirection(scratchVec3b, this);

                if (vec3.dot(scratchVec3a, scratchVec3b) > 0)
                    reverseRailDirection(this);
            }

            moveCoordAndFollowTrans(this, deltaTimeFrames * 2);
            const frameMax = getBckFrameMax(this);
            const rate = calcNerveRate(this, frameMax);
            getRailDirection(scratchVec3b, this);
            vec3.lerp(this.direction, scratchVec3b, scratchVec3a, rate);

            if (isBckStopped(this))
                this.setNerve(TicoRailNrv.Talk);
        } else if (currentNerve === TicoRailNrv.Talk) {
            if (isFirstStep(this))
                startBck(this, `Talk`);
            if (!isBckPlaying(this, `Reaction`) && getRandomInt(0, 60) === 0)
                startBckWithInterpole(this, `Reaction`, 5);
            if (isBckOneTimeAndStopped(this))
                startBck(this, `Talk`);
            if (isGreaterStep(this, 320))
                this.setNerve(TicoRailNrv.GoodBye);
        } else if (currentNerve === TicoRailNrv.GoodBye) {
            if (isFirstStep(this)) {
                startBck(this, `CallBack`);
                getRailDirection(scratchVec3a, this);
                if (vec3.dot(this.direction, scratchVec3a) > 0)
                    reverseRailDirection(this);
            }
            moveCoordAndFollowTrans(this, deltaTimeFrames * 1.5);
            // TODO(jstpierre): isBckLooped
            const endFrame = getBckFrameMax(this);
            if (isGreaterStep(this, endFrame)) {
                this.talkingActor = null;
                this.setNerve(TicoRailNrv.MoveSign);
            }
        }
    }

    public isStopped(step: number): boolean {
        return this.getCurrentNerve() === TicoRailNrv.Wait && isGreaterStep(this, step);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('Tico');
    }
}

export class SubmarineSteam extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        connectToSceneMapObjMovement(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, getObjectName(infoIter));

        emitEffect(sceneObjHolder, this, 'Steam');
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
    }
}

const enum PalmIslandNrv { Wait, Float }

export class PalmIsland extends LiveActor<PalmIslandNrv> {
    private floatDelay: number;
    private rippleTranslation = vec3.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'PalmIsland');
        connectToSceneMapObj(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, null);

        this.floatDelay = getRandomInt(0, 60);

        this.initNerve(PalmIslandNrv.Wait);

        calcUpVec(this.gravityVector, this);
        vec3.negate(this.gravityVector, this.gravityVector);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: PalmIslandNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === PalmIslandNrv.Wait) {
            if (isGreaterStep(this, this.floatDelay))
                this.setNerve(PalmIslandNrv.Float);
        } else if (currentNerve === PalmIslandNrv.Float) {
            if (isFirstStep(this)) {
                vec3.copy(this.rippleTranslation, this.translation);
                emitEffect(sceneObjHolder, this, 'Ripple');
                setEffectHostSRT(this, 'Ripple', this.rippleTranslation, null, null);
            }

            const theta = MathConstants.DEG_TO_RAD * (90 + 1.44 * this.getNerveStep());
            const waveAmpl = Math.sin(theta) * 1.44;
            vec3.scale(this.velocity, this.gravityVector, waveAmpl);
        }
    }
}

const warpPodColorTable = [
    colorNewFromRGBA8(0x0064C8FF),
    colorNewFromRGBA8(0x2CFF2AFF),
    colorNewFromRGBA8(0xFF3C3CFF),
    colorNewFromRGBA8(0xC4A600FF),
    colorNewFromRGBA8(0x00FF00FF),
    colorNewFromRGBA8(0xFF00FFFF),
    colorNewFromRGBA8(0xFFFF00FF),
    colorNewFromRGBA8(0xFFFFFFFF),
];

function compareVec3(a: vec3, b: vec3): number {
    if (a[0] !== b[0]) return a[0] - b[0];
    if (a[1] !== b[1]) return a[1] - b[1];
    if (a[2] !== b[2]) return a[2] - b[2];
    return 0;
}

// This is kept as a separate class to make cleanup easier.
class WarpPodPathDrawer {
    private testColor: BTIData;
    private materialHelper: GXMaterialHelperGfx;
    private ddraw = new TDDraw();

    constructor(sceneObjHolder: SceneObjHolder, arc: RARC.JKRArchive, private points: vec3[], private color: Color) {
        this.testColor = loadBTIData(sceneObjHolder, arc, `TestColor.bti`);
        // This doesn't seem to be used...
        // this.testMask = loadBTIData(sceneObjHolder, arc, `TestMask.bti`);

        this.ddraw.setVtxDesc(GX.Attr.POS, true);
        this.ddraw.setVtxDesc(GX.Attr.TEX0, true);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.POS, GX.CompCnt.POS_XYZ);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.TEX0, GX.CompCnt.TEX_ST);

        // Material.
        const mb = new GXMaterialBuilder('WarpPodPathDrawer');
        mb.setChanCtrl(GX.ColorChannelID.COLOR0A0, false, GX.ColorSrc.VTX, GX.ColorSrc.VTX, 0, GX.DiffuseFunction.NONE, GX.AttenuationFunction.NONE);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD0, GX.TexGenType.MTX2x4, GX.TexGenSrc.TEX0, GX.TexGenMatrix.TEXMTX0);
        mb.setTevOrder(0, GX.TexCoordID.TEXCOORD0, GX.TexMapID.TEXMAP0, GX.RasColorChannelID.COLOR_ZERO);
        mb.setTevColorIn(0, GX.CC.C0, GX.CC.ONE, GX.CC.TEXA, GX.CC.ZERO);
        mb.setTevColorOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setTevAlphaIn(0, GX.CA.ZERO, GX.CA.TEXA, GX.CA.KONST, GX.CA.ZERO);
        mb.setTevAlphaOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_2, true, GX.Register.PREV);
        mb.setBlendMode(GX.BlendMode.BLEND, GX.BlendFactor.SRCALPHA, GX.BlendFactor.ONE);
        mb.setZMode(true, GX.CompareType.LEQUAL, false);
        mb.setUsePnMtxIdx(false);
        this.materialHelper = new GXMaterialHelperGfx(mb.finish());
    }

    private drawPathPart(camera: Camera, cross: boolean): void {
        this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);
        for (let i = 0; i < this.points.length - 1; i++) {
            vec3.sub(scratchVec3a, this.points[i + 1], this.points[i]);
            getCamZdir(scratchVec3b, camera);
            vecKillElement(scratchVec3c, scratchVec3a, scratchVec3b);
            vec3.normalize(scratchVec3c, scratchVec3c);

            vec3.cross(scratchVec3a, scratchVec3c, scratchVec3b);

            if (cross) {
                vec3.normalize(scratchVec3a, scratchVec3a);
                vec3.cross(scratchVec3a, scratchVec3a, scratchVec3c);
            }
    
            normToLength(scratchVec3a, 30);

            const texCoordY = Math.abs((2.0 * (i / this.points.length)) - 1.0);

            vec3.add(scratchVec3c, this.points[i], scratchVec3a);
            this.ddraw.position3vec3(scratchVec3c);
            this.ddraw.texCoord2f32(GX.Attr.TEX0, 0.0, texCoordY);

            vec3.sub(scratchVec3c, this.points[i], scratchVec3a);
            this.ddraw.position3vec3(scratchVec3c);
            this.ddraw.texCoord2f32(GX.Attr.TEX0, 1.0, texCoordY);
        }
        this.ddraw.end();
    }

    private drawPath(camera: Camera): void {
        this.drawPathPart(camera, false);
        this.drawPathPart(camera, true);
    }

    public draw(device: GfxDevice, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        this.testColor.fillTextureMapping(materialParams.m_TextureMapping[0]);
        colorCopy(materialParams.u_Color[ColorKind.C0], this.color);

        const template = renderInstManager.pushTemplateRenderInst();

        const offs = template.allocateUniformBuffer(ub_MaterialParams, this.materialHelper.materialParamsBufferSize);
        this.materialHelper.fillMaterialParamsDataOnInst(template, offs, materialParams);

        template.setSamplerBindingsFromTextureMappings(materialParams.m_TextureMapping);

        template.allocateUniformBuffer(ub_PacketParams, ub_PacketParamsBufferSize);
        mat4.copy(packetParams.u_PosMtx[0], viewerInput.camera.viewMatrix);
        fillPacketParamsData(template.mapUniformBufferF32(ub_PacketParams), template.getUniformBufferOffset(ub_PacketParams), packetParams);

        this.materialHelper.setOnRenderInst(device, renderInstManager.gfxRenderCache, template);

        this.ddraw.beginDraw();
        this.drawPath(viewerInput.camera);
        const renderInst = this.ddraw.endDraw(device, renderInstManager);
        renderInstManager.submitRenderInst(renderInst);

        renderInstManager.popTemplateRenderInst();
    }

    public destroy(device: GfxDevice): void {
        this.testColor.destroy(device);
        this.ddraw.destroy(device);
    }
}

export class WarpPod extends LiveActor {
    private visible: boolean;
    private groupId: number;
    private pairedWarpPod: WarpPod | null = null;
    private isPairPrimary: boolean = false;
    private warpPathPoints: vec3[] | null = null;
    private pathDrawer: WarpPodPathDrawer | null = null;
    private color: Color;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, "WarpPod");

        this.visible = fallback(getJMapInfoArg1(infoIter), 1) !== 0;
        const hasSaveFlag = getJMapInfoBool(fallback(getJMapInfoArg3(infoIter), -1));
        const astroDomeNum = getJMapInfoBool(fallback(getJMapInfoArg4(infoIter), -1));
        const colorIndex = fallback(getJMapInfoArg6(infoIter), 0);
        this.isPairPrimary = getJMapInfoBool(fallback(getJMapInfoArg7(infoIter), -1));

        let color = warpPodColorTable[colorIndex];
        if (color === undefined) {
            // Seems to happen in SMG2 sometimes; they might have expanded the color table.
            color = warpPodColorTable[0];
        }
        this.color = color;

        this.initEffectKeeper(sceneObjHolder, null);

        if (this.visible) {
            startBck(this, 'Active');
            startBrk(this, 'Active');
            // This is a bit hokey, but we don't have an XanimePlayer, so this is our solution...
            setLoopMode(this, LoopMode.ONCE);
        }

        // The game normally will check a few different save file bits
        // or the highest unlocked AstroDome, but we just declare all
        // WarpPods are active.
        const inactive = false;

        if (inactive) {
            startBck(this, 'Wait');
            startBrk(this, 'Wait');
        } else {
            this.glowEffect(sceneObjHolder);
        }

        // This isn't quite the same as original, which has a WarpPodMgr which draws all of the paths...
        if (this.visible) {
            connectToScene(sceneObjHolder, this, 0x22, 0x05, DrawBufferType.MAP_OBJ, DrawType.WARP_POD_PATH);
        } else {
            connectToScene(sceneObjHolder, this, 0x22, -1, -1, -1);
        }

        this.groupId = assertExists(getJMapInfoGroupId(infoIter));
        // Look for the pair. If it's spawned, then init.
        const pairedWarpPod = this.lookForPair(sceneObjHolder);
        if (pairedWarpPod !== null) {
            this.initPair(sceneObjHolder, pairedWarpPod);
            pairedWarpPod.initPair(sceneObjHolder, this);

            assert(this.isPairPrimary !== pairedWarpPod.isPairPrimary);
        }
    }

    private initPair(sceneObjHolder: SceneObjHolder, pairedWarpPod: WarpPod): void {
        this.pairedWarpPod = pairedWarpPod;

        // If neither explicitly marks as the primary, the primary is whichever of the two has the lowest translation.
        if (!this.isPairPrimary && !this.pairedWarpPod.isPairPrimary)
            this.isPairPrimary = compareVec3(this.translation, this.pairedWarpPod.translation) < 0;

        if (this.isPairPrimary)
            this.initDraw(sceneObjHolder);
    }

    private initDraw(sceneObjHolder: SceneObjHolder): void {
        if (this.pairedWarpPod === null || !this.isPairPrimary)
            return;

        // Quarter circles.
        const arcAngle = MathConstants.TAU / 4;

        const halfArcAngle = arcAngle / 2;

        const numPoints = 60;
        this.warpPathPoints = [];

        const delta = vec3.create();
        vec3.sub(delta, this.pairedWarpPod.translation, this.translation);
        const distance = vec3.length(delta);

        const upVec = vec3.create();
        calcUpVec(upVec, this);
        const gravityVec = vec3.create();
        vec3.negate(gravityVec, upVec);

        // Coordinate frame of the circle -- orthonormal frame based around the front vec of the delta between the two positions.
        const circleRight = vec3.create(), circleDown = vec3.create();
        vec3.cross(circleRight, delta, gravityVec);
        vec3.normalize(circleRight, circleRight);
        vec3.cross(circleDown, circleRight, delta);
        vec3.normalize(circleDown, circleDown);

        const halfway = vec3.create();
        vec3.scaleAndAdd(halfway, this.translation, delta, 0.5);

        const chordHalfLength = 0.5 * distance;
        const arcHalfLength = chordHalfLength / Math.sin(halfArcAngle);
        let a = (arcHalfLength * arcHalfLength) - (chordHalfLength * chordHalfLength);
        if (a >= 0)
            a /= Math.sqrt(a);

        const chordOffset = vec3.create();
        vec3.scaleAndAdd(chordOffset, halfway, circleDown, a);

        const cb = vec3.create();
        vec3.scale(cb, circleDown, -arcHalfLength);

        for (let i = 0; i < numPoints; i++) {
            // Concentrate more points closer to the beginning/end.
            const t = (Math.sin(Math.PI * ((i - numPoints / 2) / numPoints)) + 1.0) * 0.5;

            const theta = lerp(-halfArcAngle, halfArcAngle, t);
            mat4.fromRotation(scratchMatrix, theta, circleRight);

            const v = vec3.create();
            transformVec3Mat4w0(v, scratchMatrix, cb);
            vec3.add(v, v, chordOffset);

            // Connect to the center of the glow.
            vec3.scaleAndAdd(v, v, upVec, 200.0);

            this.warpPathPoints.push(v);
        }

        this.pathDrawer = new WarpPodPathDrawer(sceneObjHolder, this.resourceHolder.arc, this.warpPathPoints, this.color);
    }

    private lookForPair(sceneObjHolder: SceneObjHolder): WarpPod | null {
        // In the original code, there's a WarpPodMgr which manages a LiveActorGroup
        // so we don't need to search the whole thing.
        for (let i = 0; i < sceneObjHolder.sceneNameObjListExecutor.nameObjExecuteInfos.length; i++) {
            const nameObj = sceneObjHolder.sceneNameObjListExecutor.nameObjExecuteInfos[i].nameObj;
            if (nameObj !== this && nameObj instanceof WarpPod) {
                const warpPod = nameObj as WarpPod;
                if (warpPod.groupId === this.groupId)
                    return warpPod;
            }
        }

        return null;
    }

    public draw(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        super.draw(sceneObjHolder, renderInstManager, viewerInput);

        if (!isValidDraw(this))
            return;

        if (this.pathDrawer !== null)
            this.pathDrawer.draw(sceneObjHolder.modelCache.device, renderInstManager, viewerInput);
    }

    private glowEffect(sceneObjHolder: SceneObjHolder): void {
        if (this.visible) {
            emitEffect(sceneObjHolder, this, 'EndGlow');
            setEffectEnvColor(this, 'EndGlow', this.color);
        }
    }
    
    public destroy(device: GfxDevice): void {
        super.destroy(device);

        if (this.pathDrawer !== null)
            this.pathDrawer.destroy(device);
    }
}

export class WaterPlantDrawInit extends NameObj {
    public angle: number = 0;
    public swingSpeed: number = 0.03;
    public swingWidth: number = 20;
    public swingPoints: number[] = nArray(64, () => 0);
    public waterPlantA: BTIData;
    public waterPlantB: BTIData;
    public waterPlantC: BTIData;
    public waterPlantD: BTIData;
    public materialHelper: GXMaterialHelperGfx;
    public drawVec = vec3.create();

    constructor(sceneObjHolder: SceneObjHolder) {
        super(sceneObjHolder, 'WaterPlantDrawInit');

        connectToScene(sceneObjHolder, this, 0x22, -1, -1, -1);

        const arc = sceneObjHolder.modelCache.getObjectData('WaterPlant')!;
        this.waterPlantA = loadBTIData(sceneObjHolder, arc, `WaterPlantA.bti`);
        this.waterPlantB = loadBTIData(sceneObjHolder, arc, `WaterPlantB.bti`);
        this.waterPlantC = loadBTIData(sceneObjHolder, arc, `WaterPlantC.bti`);
        this.waterPlantD = loadBTIData(sceneObjHolder, arc, `WaterPlantD.bti`);

        const mb = new GXMaterialBuilder(`WaterPlant`);
        mb.setChanCtrl(GX.ColorChannelID.COLOR0A0, false, GX.ColorSrc.VTX, GX.ColorSrc.VTX, 0, GX.DiffuseFunction.NONE, GX.AttenuationFunction.NONE);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD0, GX.TexGenType.MTX2x4, GX.TexGenSrc.TEX0, GX.TexGenMatrix.IDENTITY);
        mb.setTevOrder(0, GX.TexCoordID.TEXCOORD0, GX.TexMapID.TEXMAP0, GX.RasColorChannelID.COLOR_ZERO);
        mb.setTevColorIn(0, GX.CC.TEXC, GX.CC.ZERO, GX.CC.ZERO, GX.CC.ZERO);
        mb.setTevColorOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setTevAlphaIn(0, GX.CA.TEXA, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO);
        mb.setTevAlphaOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setBlendMode(GX.BlendMode.BLEND, GX.BlendFactor.SRCALPHA, GX.BlendFactor.INVSRCALPHA, GX.LogicOp.NOOP);
        mb.setAlphaCompare(GX.CompareType.GREATER, 50, GX.AlphaOp.OR, GX.CompareType.GREATER, 50);
        mb.setZMode(true, GX.CompareType.LEQUAL, true);
        mb.setCullMode(GX.CullMode.NONE);
        mb.setUsePnMtxIdx(false);
        this.materialHelper = new GXMaterialHelperGfx(mb.finish());

        this.updateSwingPos();
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);
        this.updateSwingPos();
        this.angle += this.swingSpeed * getDeltaTimeFrames(viewerInput);

        const viewMtxInv = viewerInput.camera.worldMatrix;
        vec3.set(this.drawVec, viewMtxInv[0], viewMtxInv[1], viewMtxInv[2]);
    }

    private updateSwingPos(): void {
        let theta = this.angle;
        for (let i = 0; i < this.swingPoints.length; i++) {
            this.swingPoints[i] = Math.sin(theta) * this.swingWidth;
            theta += 0.2;
        }
    }

    public loadTex(m: TextureMapping, plantType: number): void {
        if (plantType === 0)
            this.waterPlantA.fillTextureMapping(m);
        else if (plantType === 1)
            this.waterPlantB.fillTextureMapping(m);
        else if (plantType === 2)
            this.waterPlantC.fillTextureMapping(m);
        else if (plantType === 3)
            this.waterPlantD.fillTextureMapping(m);
        else
            throw "whoops";
    }

    public destroy(device: GfxDevice): void {
        super.destroy(device);
        this.waterPlantA.destroy(device);
        this.waterPlantB.destroy(device);
        this.waterPlantC.destroy(device);
        this.waterPlantD.destroy(device);
    }
}

class WaterPlantData {
    public position = vec3.create();
    public axisZ = vec3.create();
    public height: number = 0;
    public swingPosIdx0: number = 0;
    public swingPosIdx1: number = 0;
    public swingPosIdx2: number = 0;
}

const waterPlantHeightTable = [150, 200, 300, 250];
export class WaterPlant extends LiveActor {
    private plantCount: number;
    private radius: number;
    private plantType: number;
    private height: number;
    private plantData: WaterPlantData[] = [];
    private ddraw = new TDDraw();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        sceneObjHolder.create(SceneObj.WaterPlantDrawInit);

        connectToScene(sceneObjHolder, this, 0x22, -1, -1, DrawType.WATER_PLANT);
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.plantCount = fallback(getJMapInfoArg0(infoIter), 0x16);
        this.radius = fallback(getJMapInfoArg1(infoIter), 500);
        this.plantType = fallback(getJMapInfoArg3(infoIter), 0);
        this.height = waterPlantHeightTable[this.plantType];

        this.ddraw.setVtxDesc(GX.Attr.POS, true);
        this.ddraw.setVtxDesc(GX.Attr.TEX0, true);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.POS, GX.CompCnt.POS_XYZ);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.TEX0, GX.CompCnt.POS_XYZ);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        super.initAfterPlacement(sceneObjHolder);

        computeModelMatrixR(scratchMatrix, 0, 15.0 * MathConstants.DEG_TO_RAD, 0);

        // Scatter the plants around.
        const axisZ = scratchVec3;
        let swingPosIdx = 0;
        vec3.set(axisZ, 0, 0, 1);
        for (let i = 0; i < this.plantCount; i++) {
            const plantData = new WaterPlantData();

            for (let j = 0; j < 10; j++) {
                const x = getRandomFloat(-this.radius, this.radius);
                const z = getRandomFloat(-this.radius, this.radius);
                vec3.set(plantData.position, this.translation[0] + x, this.translation[1] + 500.0, this.translation[2] + z);
                if (calcMapGround(sceneObjHolder, plantData.position, plantData.position, 1000.0))
                    break;
            }

            vec3.copy(plantData.axisZ, axisZ);

            plantData.height = getRandomFloat(this.height, 2.0 * this.height);
            plantData.swingPosIdx0 = swingPosIdx + 6;
            plantData.swingPosIdx1 = swingPosIdx + 3;
            plantData.swingPosIdx2 = swingPosIdx;
            swingPosIdx = (swingPosIdx + 60) % 57;

            vec3.transformMat4(axisZ, axisZ, scratchMatrix);

            this.plantData.push(plantData);
        }
    }

    private drawStrip(ddraw: TDDraw, v0: vec3, dx: number, dz: number, tx: number): void {
        ddraw.position3f32(v0[0] - dx, v0[1], v0[2] - dz);
        ddraw.texCoord2f32(GX.Attr.TEX0, 0.0, tx);
        ddraw.position3f32(v0[0] + dx, v0[1], v0[2] + dz);
        ddraw.texCoord2f32(GX.Attr.TEX0, 1.0, tx);
    }

    public draw(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        super.draw(sceneObjHolder, renderInstManager, viewerInput);

        if (!isValidDraw(this))
            return;

        const waterPlantDrawInit = sceneObjHolder.waterPlantDrawInit!;

        this.ddraw.beginDraw();

        for (let i = 0; i < this.plantData.length; i++) {
            const plantData = this.plantData[i];
            vec3.scaleAndAdd(scratchVec3a, plantData.position, plantData.axisZ, waterPlantDrawInit.swingPoints[plantData.swingPosIdx0]);
            vec3.scaleAndAdd(scratchVec3b, plantData.position, plantData.axisZ, waterPlantDrawInit.swingPoints[plantData.swingPosIdx1]);
            vec3.scaleAndAdd(scratchVec3c, plantData.position, plantData.axisZ, waterPlantDrawInit.swingPoints[plantData.swingPosIdx2]);

            scratchVec3a[1] += plantData.height * 0.5;
            scratchVec3b[1] += plantData.height * 0.8;
            scratchVec3c[1] += plantData.height * 1.0;

            this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);
            this.ddraw.allocVertices(8);

            const dx = waterPlantDrawInit.drawVec[0] * 20.0;
            const dz = waterPlantDrawInit.drawVec[2] * 20.0;

            this.drawStrip(this.ddraw, scratchVec3c, dx, dz, 0.0);
            this.drawStrip(this.ddraw, scratchVec3b, dx, dz, 0.2);
            this.drawStrip(this.ddraw, scratchVec3a, dx, dz, 0.5);
            this.drawStrip(this.ddraw, plantData.position, dx, dz, 1.0);

            this.ddraw.end();
        }

        const device = sceneObjHolder.modelCache.device;
        const renderInst = this.ddraw.endDraw(device, renderInstManager);

        waterPlantDrawInit.loadTex(materialParams.m_TextureMapping[0], this.plantType);
        const materialHelper = waterPlantDrawInit.materialHelper;
        const offs = renderInst.allocateUniformBuffer(ub_MaterialParams, materialHelper.materialParamsBufferSize);
        materialHelper.fillMaterialParamsDataOnInst(renderInst, offs, materialParams);
        renderInst.setSamplerBindingsFromTextureMappings(materialParams.m_TextureMapping);
        renderInst.allocateUniformBuffer(ub_PacketParams, ub_PacketParamsBufferSize);
        mat4.copy(packetParams.u_PosMtx[0], viewerInput.camera.viewMatrix);
        fillPacketParamsData(renderInst.mapUniformBufferF32(ub_PacketParams), renderInst.getUniformBufferOffset(ub_PacketParams), packetParams);
        materialHelper.setOnRenderInst(device, renderInstManager.gfxRenderCache, renderInst);

        renderInstManager.submitRenderInst(renderInst);
    }

    public destroy(device: GfxDevice): void {
        super.destroy(device);
        this.ddraw.destroy(device);
    }
}

export class StarPieceGroup extends LiveActor {
    private starPieces: StarPiece[] = [];
    private isConnectedWithRail: boolean = false;
    private spawnOnRailPoints: boolean = false;
    private radius: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);

        let starPieceCount = 6;

        // TODO(jstpierre): StarPieceFlow
        starPieceCount = fallback(getJMapInfoArg0(infoIter), starPieceCount);
        this.radius = fallback(getJMapInfoArg1(infoIter), 400);
        const arg2 = fallback(getJMapInfoArg2(infoIter), -1);

        if (isConnectedWithRail(infoIter)) {
            this.initRailRider(sceneObjHolder, infoIter);
            this.isConnectedWithRail = true;

            if (arg2 === 1) {
                starPieceCount = getRailPointNum(this);
                this.spawnOnRailPoints = true;
            }
        }

        for (let i = 0; i < starPieceCount; i++) {
            const starPiece = new StarPiece(zoneAndLayer, sceneObjHolder, null);
            this.starPieces.push(starPiece);
        }

        this.placementAllPiece();
    }

    private placementAllPiece(): void {
        if (!this.isConnectedWithRail)
            this.placementPieceOnCircle();
        else if (this.spawnOnRailPoints)
            this.placementPieceOnRailPoint();
        else
            this.placementPieceOnRail();
    }

    private placementPieceOnCircle(): void {
        if (this.starPieces.length === 1) {
            vec3.copy(this.starPieces[0].translation, this.translation);
        } else {
            makeMtxTRFromActor(scratchMatrix, this);
            calcMtxAxis(scratchVec3a, null, scratchVec3b, scratchMatrix);

            for (let i = 0; i < this.starPieces.length; i++) {
                const starPiece = this.starPieces[i];
                const theta = MathConstants.TAU * (i / this.starPieces.length);
                vec3.scaleAndAdd(starPiece.translation, this.translation, scratchVec3a, Math.cos(theta) * this.radius);
                vec3.scaleAndAdd(starPiece.translation, starPiece.translation, scratchVec3b, Math.sin(theta) * this.radius);
            }
        }
    }

    private placementPieceOnRailPoint(): void {
        assert(this.starPieces.length === getRailPointNum(this));
        for (let i = 0; i < this.starPieces.length; i++)
            calcRailPointPos(this.starPieces[i].translation, this, i);
    }

    private placementPieceOnRail(): void {
        const totalRailLength = getRailTotalLength(this);

        let speed = 0.0;
        if (this.starPieces.length > 1) {
            let denom = this.starPieces.length;
            if (!isLoopRail(this))
                denom -= 1;

            speed = totalRailLength / denom;
        }

        let coord = 0;
        for (let i = 0; i < this.starPieces.length; i++) {
            calcRailPosAtCoord(this.starPieces[i].translation, this, coord);
            coord += speed;
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('StarPiece');
    }
}

const enum ShellfishNrv { Wait, Open, OpenWait, CloseSignal, Close }

const shellfishChipOffset = vec3.fromValues(0, 100, 50);
const shellfishCoinOffset = vec3.fromValues(0, 50, 30);
export class Shellfish extends LiveActor<ShellfishNrv> {
    private item: LiveActor;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'Shellfish');
        connectToSceneMapObjStrongLight(sceneObjHolder, this);

        this.initEffectKeeper(sceneObjHolder, null);
        this.initItem(sceneObjHolder);
        this.initNerve(ShellfishNrv.Wait);
    }

    private initItem(sceneObjHolder: SceneObjHolder): void {
        if (this.name === 'ShellfishCoin')
            this.initCoin(sceneObjHolder);
        else if (this.name === 'ShellfishYellowChip')
            this.initYellowChip(sceneObjHolder);
    }

    private initCoin(sceneObjHolder: SceneObjHolder): void {
        this.item = new Coin(this.zoneAndLayer, sceneObjHolder, null, false);
        const mtx = this.getBaseMtx()!;
        vec3.transformMat4(this.item.translation, shellfishCoinOffset, mtx);
        this.item.makeActorAppeared(sceneObjHolder);
    }

    private initYellowChip(sceneObjHolder: SceneObjHolder): void {
        this.item = new YellowChip(this.zoneAndLayer, sceneObjHolder, null);
        const mtx = this.getBaseMtx()!;
        vec3.transformMat4(this.item.translation, shellfishChipOffset, mtx);
        this.item.makeActorAppeared(sceneObjHolder);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: ShellfishNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === ShellfishNrv.Wait) {
            if (isFirstStep(this))
                startBck(this, 'Wait');

            if (isFirstStep(this))
                this.setNerve(ShellfishNrv.Open);
        } else if (currentNerve === ShellfishNrv.Open) {
            if (isFirstStep(this))
                startBck(this, 'Open');

            if (isGreaterStep(this, 100))
                this.setNerve(ShellfishNrv.OpenWait);
        } else if (currentNerve === ShellfishNrv.OpenWait) {
            if (isGreaterStep(this, 170))
                this.setNerve(ShellfishNrv.CloseSignal);
        } else if (currentNerve === ShellfishNrv.CloseSignal) {
            if (isFirstStep(this))
                startBck(this, 'CloseSignal');

            if (isGreaterStep(this, 150))
                this.setNerve(ShellfishNrv.Close);
        } else if (currentNerve === ShellfishNrv.Close) {
            if (isFirstStep(this))
                startBck(this, 'Close');

            if (isBckStopped(this))
                this.setNerve(ShellfishNrv.Wait);
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('Shellfish');
    }
}

export class PunchBox extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'PunchBox');
        connectToSceneMapObjStrongLight(sceneObjHolder, this);

        this.initEffectKeeper(sceneObjHolder, null);
    }
}

export class ChooChooTrain extends LiveActor {
    private trainBodies: ModelObj[] = [];
    private speed: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initRailRider(sceneObjHolder, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'ChooChooTrain');
        connectToSceneCollisionMapObj(sceneObjHolder, this);
        this.initEffectKeeper(sceneObjHolder, null);

        const numTrainBodies = fallback(getJMapInfoArg0(infoIter), 3);
        this.speed = fallback(getJMapInfoArg1(infoIter), 5);

        for (let i = 0; i < numTrainBodies; i++) {
            const trainBody = new ModelObj(zoneAndLayer, sceneObjHolder, 'ChooChooTrainBody', 'ChooChooTrainBody', null, -2, 0x1E, 2);
            this.trainBodies.push(trainBody);
        }

        moveCoordAndTransToNearestRailPos(this);
        const coord = getRailCoord(this);

        reverseRailDirection(this);

        for (let i = 0; i < this.trainBodies.length; i++) {
            moveCoord(this, 1080 * this.scale[1]);
            moveTransToOtherActorRailPos(this.trainBodies[i], this);
            startBck(this.trainBodies[i], 'Run');
        }

        setRailCoord(this, coord);
        startBck(this, 'Run');
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);

        moveCoordAndFollowTrans(this, this.speed);

        getRailDirection(scratchVec3a, this);
        const angle = Math.atan2(scratchVec3a[2], scratchVec3a[0]);
        this.rotation[1] = -angle + MathConstants.TAU / 4;

        const coord = getRailCoord(this);
        reverseRailDirection(this);

        for (let i = 0; i < this.trainBodies.length; i++) {
            const body = this.trainBodies[i];
            moveCoord(this, 1080 * this.scale[1]);
            moveTransToOtherActorRailPos(body, this);
            getRailDirection(scratchVec3a, this);
            const angle = Math.atan2(scratchVec3a[2], scratchVec3a[0]);
            body.rotation[1] = -angle - MathConstants.TAU / 4;
        }

        reverseRailDirection(this);

        setRailCoord(this, coord);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);
        sceneObjHolder.modelCache.requestObjectData('ChooChooTrainBody');
    }
}

class SwingRopePoint {
    public position = vec3.create();
    public accel = vec3.create();
    public axisX = vec3.fromValues(1, 0, 0);
    public axisY = vec3.fromValues(0, 1, 0);
    public axisZ = vec3.fromValues(0, 0, 1);

    constructor(position: vec3) {
        vec3.copy(this.position, position);
    }

    public addAccel(v: vec3): void {
        vec3.add(this.accel, this.accel, v);
    }

    public restrict(pos: vec3, limit: number, accel: vec3 | null): void {
        vec3.add(scratchVec3a, this.position, this.accel);
        vec3.sub(scratchVec3a, scratchVec3a, pos);
        if (accel !== null)
            vec3.sub(scratchVec3a, scratchVec3a, accel);

        const mag = vec3.squaredLength(scratchVec3a);

        vec3.normalize(scratchVec3b, scratchVec3a);
        vec3.negate(this.axisY, scratchVec3b);

        if (mag >= limit*limit) {
            vec3.scale(scratchVec3b, scratchVec3b, limit);
            vec3.sub(scratchVec3a, scratchVec3a, scratchVec3b);
            vec3.sub(this.accel, this.accel, scratchVec3a);
        }
    }

    public updatePos(drag: number): void {
        vec3.add(this.position, this.position, this.accel);
        vec3.scale(this.accel, this.accel, drag);
    }

    public updateAxis(axisZ: vec3): void {
        vec3.cross(this.axisX, this.axisY, axisZ);
        vec3.normalize(this.axisX, this.axisX);

        vec3.cross(this.axisZ, this.axisX, this.axisY);
        vec3.normalize(this.axisZ, this.axisZ);
    }

    public updatePosAndAxis(axisZ: vec3, drag: number): void {
        this.updatePos(drag);
        this.updateAxis(axisZ);
    }
}

export class SwingRopeGroup extends NameObj {
    public swingRope: BTIData;
    public materialHelper: GXMaterialHelperGfx;

    constructor(sceneObjHolder: SceneObjHolder) {
        super(sceneObjHolder, 'SwingRopeGroup');

        const arc = sceneObjHolder.modelCache.getObjectData('SwingRope')!;
        this.swingRope = loadBTIData(sceneObjHolder, arc, `SwingRope.bti`);

        const mb = new GXMaterialBuilder(`SwingRope`);
        mb.setChanCtrl(GX.ColorChannelID.COLOR0A0, false, GX.ColorSrc.VTX, GX.ColorSrc.VTX, 0, GX.DiffuseFunction.NONE, GX.AttenuationFunction.NONE);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD0, GX.TexGenType.MTX3x4, GX.TexGenSrc.TEX0, GX.TexGenMatrix.IDENTITY);
        mb.setTevOrder(0, GX.TexCoordID.TEXCOORD0, GX.TexMapID.TEXMAP0, GX.RasColorChannelID.COLOR0A0);
        mb.setTevColorIn(0, GX.CC.ZERO, GX.CC.TEXC, GX.CC.RASC, GX.CC.ZERO);
        mb.setTevColorOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setTevAlphaIn(0, GX.CA.TEXA, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO);
        mb.setTevAlphaOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setBlendMode(GX.BlendMode.BLEND, GX.BlendFactor.SRCALPHA, GX.BlendFactor.INVSRCALPHA, GX.LogicOp.NOOP);
        // Original code uses a pretty awful alpha compare... we up it a bit to get it looking better...
        mb.setAlphaCompare(GX.CompareType.GREATER, 50, GX.AlphaOp.OR, GX.CompareType.GREATER, 50);
        mb.setZMode(true, GX.CompareType.LEQUAL, true);
        mb.setCullMode(GX.CullMode.NONE);
        mb.setUsePnMtxIdx(false);
        this.materialHelper = new GXMaterialHelperGfx(mb.finish());
    }

    public destroy(device: GfxDevice): void {
        super.destroy(device);
        this.swingRope.destroy(device);
    }
}

const swingRopeColorPlusZ = colorNewFromRGBA8(0xFFFFFFFF);
const swingRopeColorPlusX = colorNewFromRGBA8(0xFFFFFFFF);
const swingRopeColorMinusX = colorNewFromRGBA8(0xFFFFFFFF);
export class SwingRope extends LiveActor {
    private pos = vec3.create();
    private height: number;
    private ddraw = new TDDraw();
    private swingRopePoints: SwingRopePoint[] = [];

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        sceneObjHolder.create(SceneObj.SwingRopeGroup);
        connectToScene(sceneObjHolder, this, 0x29, -1, -1, DrawType.SWING_ROPE);
        initDefaultPos(sceneObjHolder, this, infoIter);
        vec3.copy(this.pos, this.translation);
        this.height = 100.0 * this.scale[1];
        this.initPoints();

        this.ddraw.setVtxDesc(GX.Attr.POS, true);
        this.ddraw.setVtxDesc(GX.Attr.CLR0, true);
        this.ddraw.setVtxDesc(GX.Attr.TEX0, true);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.POS, GX.CompCnt.POS_XYZ);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.CLR0, GX.CompCnt.CLR_RGBA);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.TEX0, GX.CompCnt.TEX_ST);
    }

    private initPoints(): void {
        const pointCount = (this.height / 50.0) | 0;

        for (let i = 0; i < pointCount; i++) {
            vec3.scaleAndAdd(scratchVec3a, this.pos, this.gravityVector, 50.0 * (i + 1));
            const p = new SwingRopePoint(scratchVec3a);
            this.swingRopePoints.push(p);
        }
    }

    private sendPoint(v: vec3, axisX: vec3, axisZ: vec3, sx: number, sz: number, color: Color, tx: number, ty: number): void {
        this.ddraw.position3f32(
            v[0] + axisX[0] * sx + axisZ[0] * sz,
            v[1] + axisX[1] * sx + axisZ[1] * sz,
            v[2] + axisX[2] * sx + axisZ[2] * sz,
        );
        this.ddraw.color4color(GX.Attr.CLR0, color);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, tx, ty);
    }

    private drawStop(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        this.ddraw.beginDraw();
        this.ddraw.allocVertices(12);

        const ty = 0.13 * (this.height / 50.0);

        const p = this.swingRopePoints[0]!;
        vec3.copy(scratchVec3a, this.pos);
        vec3.copy(scratchVec3b, this.pos);
        scratchVec3b[1] -= this.height;

        this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);
        this.sendPoint(scratchVec3a, p.axisX, p.axisZ, -30.0,  43.0, swingRopeColorPlusZ,  0.0, 0.0);
        this.sendPoint(scratchVec3a, p.axisX, p.axisZ,  33.0, -43.0, swingRopeColorPlusX,  1.0, 0.0);
        this.sendPoint(scratchVec3b, p.axisX, p.axisZ, -30.0,  43.0, swingRopeColorPlusZ,  0.0, ty);
        this.sendPoint(scratchVec3b, p.axisX, p.axisZ,  33.0, -43.0, swingRopeColorPlusX,  1.0, ty);
        this.ddraw.end();

        this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);
        this.sendPoint(scratchVec3a, p.axisX, p.axisZ, -33.0, -43.0, swingRopeColorMinusX, 0.0, 0.0);
        this.sendPoint(scratchVec3a, p.axisX, p.axisZ,  30.0,  43.0, swingRopeColorPlusZ,  1.0, 0.0);
        this.sendPoint(scratchVec3b, p.axisX, p.axisZ, -33.0, -43.0, swingRopeColorMinusX, 0.0, ty);
        this.sendPoint(scratchVec3b, p.axisX, p.axisZ,  30.0,  43.0, swingRopeColorPlusZ,  1.0, ty);
        this.ddraw.end();

        this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);
        this.sendPoint(scratchVec3a, p.axisX, p.axisZ,  43.0,  -3.0, swingRopeColorPlusX,  0.0, 0.0);
        this.sendPoint(scratchVec3a, p.axisX, p.axisZ, -43.0,  -3.0, swingRopeColorMinusX, 1.0, 0.0);
        this.sendPoint(scratchVec3b, p.axisX, p.axisZ,  43.0,  -3.0, swingRopeColorPlusX,  0.0, ty);
        this.sendPoint(scratchVec3b, p.axisX, p.axisZ, -43.0,  -3.0, swingRopeColorMinusX, 1.0, ty);
        this.ddraw.end();

        const device = sceneObjHolder.modelCache.device;
        const renderInst = this.ddraw.endDraw(device, renderInstManager);

        const swingRopeGroup = sceneObjHolder.swingRopeGroup!;
        swingRopeGroup.swingRope.fillTextureMapping(materialParams.m_TextureMapping[0]);
        const materialHelper = swingRopeGroup.materialHelper;
        const offs = renderInst.allocateUniformBuffer(ub_MaterialParams, materialHelper.materialParamsBufferSize);
        materialHelper.fillMaterialParamsDataOnInst(renderInst, offs, materialParams);
        renderInst.setSamplerBindingsFromTextureMappings(materialParams.m_TextureMapping);
        renderInst.allocateUniformBuffer(ub_PacketParams, ub_PacketParamsBufferSize);
        mat4.copy(packetParams.u_PosMtx[0], viewerInput.camera.viewMatrix);
        fillPacketParamsData(renderInst.mapUniformBufferF32(ub_PacketParams), renderInst.getUniformBufferOffset(ub_PacketParams), packetParams);
        materialHelper.setOnRenderInst(device, renderInstManager.gfxRenderCache, renderInst);

        renderInstManager.submitRenderInst(renderInst);
    }

    public draw(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        super.draw(sceneObjHolder, renderInstManager, viewerInput);

        if (!isValidDraw(this))
            return;

        this.drawStop(sceneObjHolder, renderInstManager, viewerInput);
    }

    public destroy(device: GfxDevice): void {
        super.destroy(device);
        this.ddraw.destroy(device);
    }
}

export class TrapezeRopeDrawInit extends NameObj {
    public trapezeRope: BTIData;
    public materialHelper: GXMaterialHelperGfx;

    constructor(sceneObjHolder: SceneObjHolder) {
        super(sceneObjHolder, 'TrapezeRopeDrawInit');

        const arc = sceneObjHolder.modelCache.getObjectData('Trapeze')!;
        this.trapezeRope = loadBTIData(sceneObjHolder, arc, `TrapezeRope.bti`);

        const mb = new GXMaterialBuilder(`TrapezeRope`);
        mb.setChanCtrl(GX.ColorChannelID.COLOR0A0, false, GX.ColorSrc.VTX, GX.ColorSrc.VTX, 0, GX.DiffuseFunction.NONE, GX.AttenuationFunction.NONE);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD0, GX.TexGenType.MTX3x4, GX.TexGenSrc.TEX0, GX.TexGenMatrix.IDENTITY);
        mb.setTevOrder(0, GX.TexCoordID.TEXCOORD0, GX.TexMapID.TEXMAP0, GX.RasColorChannelID.COLOR0A0);
        mb.setTevColorIn(0, GX.CC.ZERO, GX.CC.TEXC, GX.CC.RASC, GX.CC.ZERO);
        mb.setTevColorOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setTevAlphaIn(0, GX.CA.TEXA, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO);
        mb.setTevAlphaOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setBlendMode(GX.BlendMode.BLEND, GX.BlendFactor.SRCALPHA, GX.BlendFactor.INVSRCALPHA, GX.LogicOp.NOOP);
        // Original code uses a pretty awful alpha compare... we up it a bit to get it looking better...
        mb.setAlphaCompare(GX.CompareType.GREATER, 50, GX.AlphaOp.OR, GX.CompareType.GREATER, 50);
        mb.setZMode(true, GX.CompareType.LEQUAL, true);
        mb.setCullMode(GX.CullMode.NONE);
        mb.setUsePnMtxIdx(false);
        this.materialHelper = new GXMaterialHelperGfx(mb.finish());
    }

    public destroy(device: GfxDevice): void {
        super.destroy(device);
        this.trapezeRope.destroy(device);
    }
}

const trapezeColorPlusZ = colorNewFromRGBA8(0xFFFFFFFF);
const trapezeColorPlusX = colorNewFromRGBA8(0xB4B4B4FF);
const trapezeColorMinusX = colorNewFromRGBA8(0x646464FF);
export class Trapeze extends LiveActor {
    private axisX = vec3.create();
    private axisY = vec3.create();
    private axisZ = vec3.create();
    private swingRopePoint: SwingRopePoint;
    private stick: PartsModel;
    private stickMtx = mat4.create();
    private ddraw = new TDDraw();
    private height: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        sceneObjHolder.create(SceneObj.TrapezeRopeDrawInit);
        connectToScene(sceneObjHolder, this, 0x29, -1, -1, DrawType.TRAPEZE);
        initDefaultPos(sceneObjHolder, this, infoIter);
        makeMtxTRFromActor(scratchMatrix, this);
        calcMtxAxis(this.axisX, this.axisY, this.axisZ, scratchMatrix);

        this.height = this.scale[1] * 100.0;
        vec3.set(this.scale, 1.0, 1.0, 1.0);

        vec3.set(scratchVec3, this.translation[0], this.translation[1] - this.height, this.translation[2]);
        this.swingRopePoint = new SwingRopePoint(scratchVec3);
        this.swingRopePoint.updatePosAndAxis(this.axisZ, 0.995);

        // I think this is a bug in the original game -- it uses ENEMY rather than RIDE?
        this.stick = new PartsModel(sceneObjHolder, 'TrapezeStick', 'Trapeze', this, DrawBufferType.ENEMY, this.stickMtx);
        this.updateStickMtx();

        this.ddraw.setVtxDesc(GX.Attr.POS, true);
        this.ddraw.setVtxDesc(GX.Attr.CLR0, true);
        this.ddraw.setVtxDesc(GX.Attr.TEX0, true);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.POS, GX.CompCnt.POS_XYZ);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.CLR0, GX.CompCnt.CLR_RGBA);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.TEX0, GX.CompCnt.TEX_ST);
    }

    private drawRope(top: vec3, bottom: vec3, axisX: vec3, axisZ: vec3, txc0: number, txc1: number): void {
        this.ddraw.allocVertices(12);

        // Rope 1.
        this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);

        this.ddraw.position3f32(
            top[0] - 12.0 * axisX[0] + 19.0 * axisZ[0],
            top[1] - 12.0 * axisX[1] + 19.0 * axisZ[1],
            top[2] - 12.0 * axisX[2] + 19.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorPlusZ);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 0.0, txc0);

        this.ddraw.position3f32(
            top[0] + 19.0 * axisX[0] - 19.0 * axisZ[0],
            top[1] + 19.0 * axisX[1] - 19.0 * axisZ[1],
            top[2] + 19.0 * axisX[2] - 19.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorPlusX);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 1.0, txc0);

        this.ddraw.position3f32(
            bottom[0] - 12.0 * axisX[0] + 19.0 * axisZ[0],
            bottom[1] - 12.0 * axisX[1] + 19.0 * axisZ[1],
            bottom[2] - 12.0 * axisX[2] + 19.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorPlusZ);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 0.0, txc1);

        this.ddraw.position3f32(
            bottom[0] + 19.0 * axisX[0] - 19.0 * axisZ[0],
            bottom[1] + 19.0 * axisX[1] - 19.0 * axisZ[1],
            bottom[2] + 19.0 * axisX[2] - 19.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorPlusX);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 1.0, txc1);

        this.ddraw.end();

        // Rope 2.
        this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);

        this.ddraw.position3f32(
            top[0] - 19.0 * axisX[0] - 19.0 * axisZ[0],
            top[1] - 19.0 * axisX[1] - 19.0 * axisZ[1],
            top[2] - 19.0 * axisX[2] - 19.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorMinusX);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 0.0, 0.7 + txc0);

        this.ddraw.position3f32(
            top[0] + 12.0 * axisX[0] + 19.0 * axisZ[0],
            top[1] + 12.0 * axisX[1] + 19.0 * axisZ[1],
            top[2] + 12.0 * axisX[2] + 19.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorPlusZ);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 1.0, 0.7 + txc0);

        this.ddraw.position3f32(
            bottom[0] - 19.0 * axisX[0] + 19.0 * axisZ[0],
            bottom[1] - 19.0 * axisX[1] + 19.0 * axisZ[1],
            bottom[2] - 19.0 * axisX[2] + 19.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorMinusX);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 0.0, 0.7 + txc1);

        this.ddraw.position3f32(
            bottom[0] + 12.0 * axisX[0] + 19.0 * axisZ[0],
            bottom[1] + 12.0 * axisX[1] + 19.0 * axisZ[1],
            bottom[2] + 12.0 * axisX[2] + 19.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorPlusZ);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 1.0, 0.7 + txc1);

        this.ddraw.end();
        
        // Rope 3.
        this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);

        this.ddraw.position3f32(
            top[0] + 19.0 * axisX[0] - 7.0 * axisZ[0],
            top[1] + 19.0 * axisX[1] - 7.0 * axisZ[1],
            top[2] + 19.0 * axisX[2] - 7.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorPlusX);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 0.0, 0.5 + txc0);

        this.ddraw.position3f32(
            top[0] - 19.0 * axisX[0] - 7.0 * axisZ[0],
            top[1] - 19.0 * axisX[1] - 7.0 * axisZ[1],
            top[2] - 19.0 * axisX[2] - 7.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorMinusX);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 1.0, 0.5 + txc0);

        this.ddraw.position3f32(
            bottom[0] + 19.0 * axisX[0] - 7.0 * axisZ[0],
            bottom[1] + 19.0 * axisX[1] - 7.0 * axisZ[1],
            bottom[2] + 19.0 * axisX[2] - 7.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorPlusX);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 0.0, 0.5 + txc1);

        this.ddraw.position3f32(
            bottom[0] - 19.0 * axisX[0] - 7.0 * axisZ[0],
            bottom[1] - 19.0 * axisX[1] - 7.0 * axisZ[1],
            bottom[2] - 19.0 * axisX[2] - 7.0 * axisZ[2],
        );
        this.ddraw.color4color(GX.Attr.CLR0, trapezeColorMinusX);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 1.0, 0.5 + txc1);

        this.ddraw.end();
    }

    public draw(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        super.draw(sceneObjHolder, renderInstManager, viewerInput);

        if (!isValidDraw(this))
            return;

        this.ddraw.beginDraw();

        // Neg
        vec3.scaleAndAdd(scratchVec3a, this.translation, this.axisX, -60.0);
        vec3.scaleAndAdd(scratchVec3b, this.swingRopePoint.position, this.axisX, -60.0);
        this.drawRope(scratchVec3a, scratchVec3b, this.swingRopePoint.axisX, this.swingRopePoint.axisZ, 0.0, 0.003 * this.height);

        // Pos
        vec3.scaleAndAdd(scratchVec3a, this.translation, this.axisX, 60.0);
        vec3.scaleAndAdd(scratchVec3b, this.swingRopePoint.position, this.axisX, 60.0);
        this.drawRope(scratchVec3a, scratchVec3b, this.swingRopePoint.axisX, this.swingRopePoint.axisZ, 0.0, 0.003 * this.height);

        const device = sceneObjHolder.modelCache.device;
        const renderInst = this.ddraw.endDraw(device, renderInstManager);

        const trapezeRopeDrawInit = sceneObjHolder.trapezeRopeDrawInit!;
        trapezeRopeDrawInit.trapezeRope.fillTextureMapping(materialParams.m_TextureMapping[0]);
        const materialHelper = trapezeRopeDrawInit.materialHelper;
        const offs = renderInst.allocateUniformBuffer(ub_MaterialParams, materialHelper.materialParamsBufferSize);
        materialHelper.fillMaterialParamsDataOnInst(renderInst, offs, materialParams);
        renderInst.setSamplerBindingsFromTextureMappings(materialParams.m_TextureMapping);
        renderInst.allocateUniformBuffer(ub_PacketParams, ub_PacketParamsBufferSize);
        mat4.copy(packetParams.u_PosMtx[0], viewerInput.camera.viewMatrix);
        fillPacketParamsData(renderInst.mapUniformBufferF32(ub_PacketParams), renderInst.getUniformBufferOffset(ub_PacketParams), packetParams);
        materialHelper.setOnRenderInst(device, renderInstManager.gfxRenderCache, renderInst);

        renderInstManager.submitRenderInst(renderInst);
    }

    private updateStickMtx(): void {
        const point = this.swingRopePoint;
        setMtxAxisXYZ(this.stickMtx, point.axisX, point.axisY, point.axisZ);
        setMatrixTranslation(this.stickMtx, point.position);
    }

    public destroy(device: GfxDevice): void {
        super.destroy(device);
        this.ddraw.destroy(device);
    }
}

class WaterPoint {
    public originalPos = vec3.create();
    public pos = vec3.create();
    public upVec = vec3.create();
    public alpha = 1.0;

    constructor(originalPos: vec3, upVec: vec3, public coordAcrossRail: number, public coordOnRail: number, public height: number, public flowSpeedRate: number) {
        vec3.copy(this.originalPos, originalPos);
        vec3.copy(this.upVec, upVec);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        if (this.height !== 0.0) {
            vec3.copy(scratchVec3a, this.originalPos);
            scratchVec3a[1] += 200.0;

            if (calcMapGround(sceneObjHolder, scratchVec3, scratchVec3a, 400.0)) {
                const y = (this.originalPos[1] - scratchVec3[1]) / 200.0;
                this.alpha = clamp(30.0 + 255.0 * y, 30.0, 255.0) / 255.0;
                this.height = Math.min(this.height, clamp(Math.abs(y) + 0.1, 0.1, 1.0));
            }
        }
    }

    public calcHeight(theta1: number, theta2: number, wave1Height: number, wave2Height: number, coordAcrossRail: number, coordOnRail: number): number {
        const wave2 = wave2Height * Math.sin(theta2 + (0.0025 * coordOnRail));
        const wave1 = wave1Height * Math.sin(theta1 + (0.003 * coordAcrossRail) + (0.0003 * coordOnRail));
        return this.height * (wave1 + wave2);
    }

    public updatePos(theta1: number, theta2: number, wave1Height: number, wave2Height: number, heightScale: number): void {
        const waveHeight = this.calcHeight(theta1, theta2, wave1Height, wave2Height, this.coordAcrossRail, this.coordOnRail) * heightScale;
        vec3.scaleAndAdd(this.pos, this.originalPos, this.upVec, -waveHeight);
    }
}

class OceanRingDrawer {
    private ddraw = new TDDraw();
    private materialHelper: GXMaterialHelperGfx;
    private water: BTIData;
    private waterIndirect: BTIData;
    private tex0Trans = vec2.create();
    private tex1Trans = vec2.create();
    private tex2Trans = vec2.create();
    private pointCount: number;

    constructor(sceneObjHolder: SceneObjHolder, private oceanRing: OceanRing) {
        this.pointCount = this.oceanRing.points.length;
        if (!isLoopRail(this.oceanRing))
            this.pointCount -= this.oceanRing.pointsPerSegment;

        this.ddraw.setVtxDesc(GX.Attr.POS, true);
        this.ddraw.setVtxDesc(GX.Attr.CLR0, true);
        this.ddraw.setVtxDesc(GX.Attr.TEX0, true);
        this.ddraw.setVtxDesc(GX.Attr.TEX1, true);
        this.ddraw.setVtxDesc(GX.Attr.TEX2, true);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.POS, GX.CompCnt.POS_XYZ);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.CLR0, GX.CompCnt.CLR_RGBA);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.TEX0, GX.CompCnt.TEX_ST);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.TEX1, GX.CompCnt.TEX_ST);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.TEX2, GX.CompCnt.TEX_ST);

        const mb = new GXMaterialBuilder('OceanRing');
        mb.setChanCtrl(GX.ColorChannelID.COLOR0A0, false, GX.ColorSrc.VTX, GX.ColorSrc.VTX, 0, GX.DiffuseFunction.NONE, GX.AttenuationFunction.NONE);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD0, GX.TexGenType.MTX2x4, GX.TexGenSrc.TEX0, GX.TexGenMatrix.TEXMTX0);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD1, GX.TexGenType.MTX2x4, GX.TexGenSrc.TEX1, GX.TexGenMatrix.TEXMTX1);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD2, GX.TexGenType.MTX2x4, GX.TexGenSrc.TEX2, GX.TexGenMatrix.TEXMTX2);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD3, GX.TexGenType.MTX3x4, GX.TexGenSrc.POS, GX.TexGenMatrix.TEXMTX3);

        const isCameraInWater = false;
        if (!isCameraInWater) {
            mb.setIndTexOrder(GX.IndTexStageID.STAGE0, GX.TexCoordID.TEXCOORD2, GX.TexMapID.TEXMAP2);
            mb.setTevIndWarp(3, GX.IndTexStageID.STAGE0, true, false, GX.IndTexMtxID._0);
        }

        mb.setTevOrder(0, GX.TexCoordID.TEXCOORD0, GX.TexMapID.TEXMAP0, GX.RasColorChannelID.COLOR_ZERO);
        mb.setTevColorIn(0, GX.CC.TEXC, GX.CC.ZERO, GX.CC.ZERO, GX.CC.ZERO);
        mb.setTevColorOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, false, GX.Register.PREV);
        mb.setTevAlphaIn(0, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO);
        mb.setTevAlphaOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, false, GX.Register.PREV);

        mb.setTevOrder(1, GX.TexCoordID.TEXCOORD1, GX.TexMapID.TEXMAP0, GX.RasColorChannelID.COLOR_ZERO);
        mb.setTevColorIn(1, GX.CC.ZERO, GX.CC.TEXC, GX.CC.CPREV, GX.CC.ZERO);
        mb.setTevColorOp(1, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.DIVIDE_2, false, GX.Register.PREV);
        mb.setTevAlphaIn(1, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO);
        mb.setTevAlphaOp(1, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_2, false, GX.Register.PREV);

        mb.setTevOrder(2, GX.TexCoordID.TEXCOORD_NULL, GX.TexMapID.TEXMAP_NULL, GX.RasColorChannelID.COLOR_ZERO);
        mb.setTevColorIn(2, GX.CC.CPREV, GX.CC.A0, GX.CC.C0, GX.CC.CPREV);
        mb.setTevColorOp(2, GX.TevOp.COMP_R8_EQ, GX.TevBias.ZERO, GX.TevScale.SCALE_1, false, GX.Register.PREV);
        mb.setTevAlphaIn(2, GX.CA.KONST, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO);
        mb.setTevAlphaOp(2, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, false, GX.Register.PREV);

        mb.setTevOrder(3, GX.TexCoordID.TEXCOORD3, GX.TexMapID.TEXMAP1, GX.RasColorChannelID.COLOR0A0);
        mb.setTevColorIn(3, GX.CC.ZERO, GX.CC.TEXC, GX.CC.C1, GX.CC.CPREV);
        mb.setTevColorOp(3, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setTevAlphaIn(3, GX.CA.RASA, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO);
        mb.setTevAlphaOp(3, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, false, GX.Register.PREV);

        mb.setBlendMode(GX.BlendMode.BLEND, GX.BlendFactor.SRCALPHA, GX.BlendFactor.INVSRCALPHA, GX.LogicOp.NOOP);
        mb.setAlphaCompare(GX.CompareType.GREATER, 0, GX.AlphaOp.OR, GX.CompareType.GREATER, 0);
        mb.setZMode(true, GX.CompareType.LEQUAL, false);
        mb.setCullMode(GX.CullMode.NONE);
        mb.setUsePnMtxIdx(false);

        this.materialHelper = new GXMaterialHelperGfx(mb.finish());

        const arc = sceneObjHolder.modelCache.getObjectData('WaterWave');
        this.water = loadBTIData(sceneObjHolder, arc, 'Water.bti');
        this.waterIndirect = loadBTIData(sceneObjHolder, arc, 'WaterIndirect.bti');
    }

    public update(deltaTimeFrames: number): void {
        this.tex0Trans[0] = (this.tex0Trans[0] + (deltaTimeFrames * -0.003)) % 1.0;
        this.tex0Trans[1] = (this.tex0Trans[1] + (deltaTimeFrames * -0.001)) % 1.0;

        this.tex1Trans[0] = (this.tex1Trans[0] + (deltaTimeFrames * -0.002)) % 1.0;
        this.tex1Trans[1] = (this.tex1Trans[1] + (deltaTimeFrames *  0.001)) % 1.0;

        this.tex2Trans[0] = (this.tex2Trans[0] + (deltaTimeFrames *  0.000)) % 1.0;
        this.tex2Trans[1] = (this.tex2Trans[1] + (deltaTimeFrames *  0.003)) % 1.0;
    }

    public draw(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        this.ddraw.beginDraw();

        const p = this.oceanRing.points, pointsPerSegment = this.oceanRing.pointsPerSegment;

        let tx0S = 0.0, tx1S = 0.0, tx2S = 0.0;
        for (let i = 0; i < this.pointCount; i += pointsPerSegment) {
            this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);

            let tx0T = 0.0, tx1T = 0.0, tx2T = 0.0;

            const tx0Sb = tx0S + 0.05;
            const tx1Sb = tx1S + 0.05;
            const tx2Sb = tx2S + 0.1;

            for (let j = i; j < i + pointsPerSegment; j++) {
                const p0 = p[j], p1 = p[(j + pointsPerSegment) % p.length];

                this.ddraw.position3vec3(p0.pos);
                this.ddraw.color4rgba8(GX.Attr.CLR0, 0xFF, 0xFF, 0xFF, p0.alpha * 0xFF);
                this.ddraw.texCoord2f32(GX.Attr.TEX0, tx0S, tx0T);
                this.ddraw.texCoord2f32(GX.Attr.TEX1, tx1S, tx1T);
                this.ddraw.texCoord2f32(GX.Attr.TEX2, tx2S, tx2T);

                this.ddraw.position3vec3(p1.pos);
                this.ddraw.color4rgba8(GX.Attr.CLR0, 0xFF, 0xFF, 0xFF, p1.alpha * 0xFF);
                this.ddraw.texCoord2f32(GX.Attr.TEX0, tx0Sb, tx0T);
                this.ddraw.texCoord2f32(GX.Attr.TEX1, tx1Sb, tx1T);
                this.ddraw.texCoord2f32(GX.Attr.TEX2, tx2Sb, tx2T);

                tx0T += 0.05;
                tx1T += 0.05;
                tx2T += 0.1;
            }

            tx0S = tx0Sb;
            tx1S = tx1Sb;
            tx2S = tx2Sb;

            this.ddraw.end();
        }

        const device = sceneObjHolder.modelCache.device;
        const renderInst = this.ddraw.endDraw(device, renderInstManager);

        setTextureMatrixST(materialParams.u_IndTexMtx[0], 0.1, null);
        setTextureMatrixST(materialParams.u_TexMtx[0], 1.0, this.tex0Trans);
        setTextureMatrixST(materialParams.u_TexMtx[1], 1.0, this.tex1Trans);
        setTextureMatrixST(materialParams.u_TexMtx[2], 1.0, this.tex2Trans);
        loadTexProjectionMtx(materialParams.u_TexMtx[3], viewerInput.camera, viewerInput.viewport);

        this.water.fillTextureMapping(materialParams.m_TextureMapping[0]);
        sceneObjHolder.specialTextureBinder.registerTextureMapping(materialParams.m_TextureMapping[1], SpecialTextureType.OpaqueSceneTexture);
        this.waterIndirect.fillTextureMapping(materialParams.m_TextureMapping[2]);
        colorFromRGBA8(materialParams.u_Color[ColorKind.C0], 0x28282814);
        colorFromRGBA8(materialParams.u_Color[ColorKind.C1], 0x76D7FFFF);

        const materialHelper = this.materialHelper;
        const offs = renderInst.allocateUniformBuffer(ub_MaterialParams, materialHelper.materialParamsBufferSize);
        materialHelper.fillMaterialParamsDataOnInst(renderInst, offs, materialParams);
        renderInst.setSamplerBindingsFromTextureMappings(materialParams.m_TextureMapping);
        renderInst.allocateUniformBuffer(ub_PacketParams, ub_PacketParamsBufferSize);
        mat4.copy(packetParams.u_PosMtx[0], viewerInput.camera.viewMatrix);
        fillPacketParamsData(renderInst.mapUniformBufferF32(ub_PacketParams), renderInst.getUniformBufferOffset(ub_PacketParams), packetParams);
        materialHelper.setOnRenderInst(device, renderInstManager.gfxRenderCache, renderInst);

        renderInstManager.submitRenderInst(renderInst);
    }

    public destroy(device: GfxDevice): void {
        this.water.destroy(device);
        this.waterIndirect.destroy(device);
        this.ddraw.destroy(device);
    }
}

class OceanRingPipeOutside extends LiveActor {
    private materialHelper: GXMaterialHelperGfx;
    private waterPipeIndirect: BTIData;
    private waterPipeHighLight: BTIData;
    private tex0Trans = vec2.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, private pipe: OceanRingPipe) {
        super(zoneAndLayer, sceneObjHolder, 'OceanRingPipeOutside');

        connectToScene(sceneObjHolder, this, -1, -1, -1, DrawType.OCEAN_RING_OUTSIDE);

        const arc = sceneObjHolder.modelCache.getObjectData('OceanRing');
        this.waterPipeIndirect = loadBTIData(sceneObjHolder, arc, 'WaterPipeIndirect.bti');
        this.waterPipeHighLight = loadBTIData(sceneObjHolder, arc, 'WaterPipeHighLight.bti');

        const mb = new GXMaterialBuilder('OceanRingPipeOutside');
        mb.setChanCtrl(GX.ColorChannelID.COLOR0, false, GX.ColorSrc.REG, GX.ColorSrc.REG, 0x00, GX.DiffuseFunction.NONE, GX.AttenuationFunction.NONE);
        mb.setChanCtrl(GX.ColorChannelID.ALPHA0, true, GX.ColorSrc.REG, GX.ColorSrc.REG, 0x04, GX.DiffuseFunction.CLAMP, GX.AttenuationFunction.NONE);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD0, GX.TexGenType.MTX2x4, GX.TexGenSrc.TEX0, GX.TexGenMatrix.TEXMTX0);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD1, GX.TexGenType.MTX2x4, GX.TexGenSrc.NRM, GX.TexGenMatrix.TEXMTX1);

        mb.setIndTexOrder(GX.IndTexStageID.STAGE0, GX.TexCoordID.TEXCOORD0, GX.TexMapID.TEXMAP0);
        mb.setTevIndWarp(0, GX.IndTexStageID.STAGE0, true, false, GX.IndTexMtxID._0);

        mb.setTevOrder(0, GX.TexCoordID.TEXCOORD1, GX.TexMapID.TEXMAP1, GX.RasColorChannelID.COLOR0A0);
        mb.setTevColorIn(0, GX.CC.TEXC, GX.CC.ZERO, GX.CC.ZERO, GX.CC.C0);
        mb.setTevColorOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setTevAlphaIn(0, GX.CA.A0, GX.CA.ZERO, GX.CA.RASA, GX.CA.ZERO);
        mb.setTevAlphaOp(0, GX.TevOp.ADD, GX.TevBias.SUBHALF, GX.TevScale.SCALE_2, true, GX.Register.PREV);

        mb.setTevOrder(1, GX.TexCoordID.TEXCOORD_NULL, GX.TexMapID.TEXMAP_NULL, GX.RasColorChannelID.COLOR0A0);
        mb.setTevColorIn(1, GX.CC.CPREV, GX.CC.ZERO, GX.CC.ZERO, GX.CC.APREV);
        mb.setTevColorOp(1, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setTevAlphaIn(1, GX.CA.KONST, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO);
        mb.setTevAlphaOp(1, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, false, GX.Register.PREV);

        mb.setUsePnMtxIdx(false);

        this.materialHelper = new GXMaterialHelperGfx(mb.finish());
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);
        this.tex0Trans[0] += -0.004 * getDeltaTimeFrames(viewerInput);
    }

    public draw(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        super.draw(sceneObjHolder, renderInstManager, viewerInput);

        if (!isValidDraw(this))
            return;

        const device = sceneObjHolder.modelCache.device;

        const renderInst = renderInstManager.newRenderInst();
        renderInst.setInputLayoutAndState(this.pipe.inputLayout, this.pipe.inputState);
        renderInst.drawIndexes(this.pipe.indexCount);

        this.waterPipeIndirect.fillTextureMapping(materialParams.m_TextureMapping[0]);
        this.waterPipeHighLight.fillTextureMapping(materialParams.m_TextureMapping[1]);

        setTextureMatrixST(materialParams.u_TexMtx[0], 1.0, this.tex0Trans);
        // Environment mapping mtx
        const dst = materialParams.u_TexMtx[1];
        computeNormalMatrix(dst, viewerInput.camera.viewMatrix, true);
        computeModelMatrixS(scratchMatrix, 0.6, 0.6, 0.6);
        mat4.mul(dst, dst, scratchMatrix);
        const flipYScale = materialParams.m_TextureMapping[1].flipY ? -1.0 : 1.0;
        buildEnvMtx(scratchMatrix, flipYScale);
        mat4.mul(dst, dst, scratchMatrix);

        colorFromRGBA8(materialParams.u_Color[ColorKind.C0], 0x1465FFB9);

        // TODO(jstpierre): Figure out how this gets loaded.
        const alpha2 = materialParams.u_Lights[2];
        alpha2.reset();
        alpha2.Color.a = 0.5;
        alpha2.Direction[1] = -1.0;

        const materialHelper = this.materialHelper;
        const offs = renderInst.allocateUniformBuffer(ub_MaterialParams, materialHelper.materialParamsBufferSize);
        materialHelper.fillMaterialParamsDataOnInst(renderInst, offs, materialParams);
        renderInst.setSamplerBindingsFromTextureMappings(materialParams.m_TextureMapping);
        renderInst.allocateUniformBuffer(ub_PacketParams, ub_PacketParamsBufferSize);
        mat4.copy(packetParams.u_PosMtx[0], viewerInput.camera.viewMatrix);
        fillPacketParamsData(renderInst.mapUniformBufferF32(ub_PacketParams), renderInst.getUniformBufferOffset(ub_PacketParams), packetParams);
        materialHelper.setOnRenderInst(device, renderInstManager.gfxRenderCache, renderInst);

        renderInstManager.submitRenderInst(renderInst);
    }

    public destroy(device: GfxDevice): void {
        super.destroy(device);
        this.waterPipeIndirect.destroy(device);
        this.waterPipeHighLight.destroy(device);
    }
}

class OceanRingPipe extends LiveActor {
    public pointsPerSegment: number = 8;
    public segmentCount: number;
    public vertexBuffer: GfxBuffer;
    public indexBuffer: GfxBuffer;
    public inputLayout: GfxInputLayout;
    public inputState: GfxInputState;
    public width1: number = 1200.0;
    public width2: number = 1200.0;
    public indexCount: number;

    public outside: OceanRingPipeOutside;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter, private oceanRing: OceanRing) {
        super(zoneAndLayer, sceneObjHolder, 'OceanRingPipe');

        connectToSceneMapObjMovement(sceneObjHolder, this);
        this.initRailRider(sceneObjHolder, infoIter);
        const points = this.initPoints(sceneObjHolder);

        if (this.oceanRing.name === 'OceanRingAndFlag') {
            for (let i = 0; i < this.segmentCount; i += 7) {
                calcGravityVector(sceneObjHolder, this, points[i * this.pointsPerSegment], scratchVec3a);
                if (scratchVec3a[1] <= -0.9) {
                    const position = !!(i & 1) ? points[i * this.pointsPerSegment] : points[i * this.pointsPerSegment + this.pointsPerSegment - 1];

                    const flag = new Flag(zoneAndLayer, sceneObjHolder, null, 'FlagSurfing');
                    vec3.set(scratchVec3, 1, 0, 0);
                    flag.setInfoPos('FlagSurfing', position, scratchVec3, 500, 300, 200, 2, 3);
                    flag.init(sceneObjHolder);
                }
            }
        }

        this.outside = new OceanRingPipeOutside(zoneAndLayer, sceneObjHolder, this);
    }

    private initPoints(sceneObjHolder: SceneObjHolder): vec3[] {
        const device = sceneObjHolder.modelCache.device;
        const cache = sceneObjHolder.modelCache.cache;

        // Initializes the vertex & index buffers.

        const railTotalLength = getRailTotalLength(this);
        this.segmentCount = ((railTotalLength / 300.0) | 0) + 1;
        const pointCount = (this.segmentCount + 1) * this.pointsPerSegment;
        const points: vec3[] = [];

        const theta = (MathConstants.TAU / 2) / (this.pointsPerSegment - 1);
        const segmentSize = railTotalLength / this.segmentCount;

        // POS, NRM, TEX0, TEX1
        // 3 + 3 + 2 + 2 = 10
        // NRM is unused for Inside, TEX1 is unused for Outside.
        const vertexBufferWordCount = pointCount * 10;

        const vertexData = new Float32Array(vertexBufferWordCount);
        let o = 0;

        assert(pointCount < 0xFFFF);
        const tristripsPerSegment = this.pointsPerSegment * 2;
        const indexCountPerSegment = getTriangleIndexCountForTopologyIndexCount(GfxTopology.TRISTRIP, tristripsPerSegment);
        this.indexCount = (this.segmentCount + 1) * indexCountPerSegment;
        const indexData = new Uint16Array(this.indexCount);
        let io = 0;
        let ibv = 0;

        let tx0S = 0.0;

        for (let i = 0; i < this.segmentCount + 1; i++) {
            getRailPos(scratchVec3a, this);
            calcGravityVector(sceneObjHolder, this, scratchVec3a, scratchVec3a);
            vec3.negate(scratchVec3a, scratchVec3a);
            getRailDirection(scratchVec3b, this);

            // Rotation matrix around pipe.
            mat4.fromRotation(scratchMatrix, theta, scratchVec3b);

            // Right vector.
            vec3.cross(scratchVec3c, scratchVec3b, scratchVec3a);
            vec3.normalize(scratchVec3c, scratchVec3c);

            const widthRate = this.width1 * this.oceanRing.calcCurrentWidthRate(getRailCoord(this), this.width2);
            getRailPos(scratchVec3a, this);

            let tx0T = 0.0;

            for (let j = 0; j < this.pointsPerSegment; j++) {
                // POS
                const posX = scratchVec3a[0] + widthRate * scratchVec3c[0];
                const posY = scratchVec3a[1] + widthRate * scratchVec3c[1];
                const posZ = scratchVec3a[2] + widthRate * scratchVec3c[2];

                vertexData[o++] = posX;
                vertexData[o++] = posY;
                vertexData[o++] = posZ;

                points.push(vec3.fromValues(posX, posY, posZ));

                // NRM
                vertexData[o++] = scratchVec3c[0];
                vertexData[o++] = scratchVec3c[1];
                vertexData[o++] = scratchVec3c[2];

                // TEX0, from OceanRingPipeOutside
                vertexData[o++] = tx0S;
                vertexData[o++] = tx0T;

                // TODO(jstpierre): TEX1
                vertexData[o++] = 0.0;
                vertexData[o++] = 0.0;

                tx0T += 1.0;

                // Rotate around ring.
                vec3.transformMat4(scratchVec3c, scratchVec3c, scratchMatrix);

                // Fill in segment index buffer with single quad.
                if (i < this.segmentCount && j < (this.pointsPerSegment - 1)) {
                    const vi0 = ibv;
                    const vi1 = ibv + this.pointsPerSegment;
                    const i0 = vi0 + 0, i1 = vi1 + 0, i2 = vi0 + 1, i3 = vi1 + 1;

                    indexData[io++] = i0;
                    indexData[io++] = i1;
                    indexData[io++] = i2;
                    indexData[io++] = i2;
                    indexData[io++] = i1;
                    indexData[io++] = i3;
                }

                ibv++;
            }

            tx0S += 0.08;

            moveCoord(this, segmentSize);
        }

        this.vertexBuffer = makeStaticDataBuffer(device, GfxBufferUsage.VERTEX, vertexData.buffer);
        this.indexBuffer = makeStaticDataBuffer(device, GfxBufferUsage.INDEX, indexData.buffer);

        const vertexAttributeDescriptors: GfxVertexAttributeDescriptor[] = [
            { location: getVertexInputLocation(VertexAttributeInput.POS), format: GfxFormat.F32_RGB, bufferIndex: 0, bufferByteOffset: 0*0x04, },
            { location: getVertexInputLocation(VertexAttributeInput.NRM), format: GfxFormat.F32_RGB, bufferIndex: 0, bufferByteOffset: 3*0x04, },
            { location: getVertexInputLocation(VertexAttributeInput.TEX01), format: GfxFormat.F32_RGBA, bufferIndex: 0, bufferByteOffset: 6*0x04, },
        ];
        const vertexBufferDescriptors: GfxInputLayoutBufferDescriptor[] = [
            { byteStride: 10*0x04, frequency: GfxVertexBufferFrequency.PER_VERTEX, },
        ];

        this.inputLayout = cache.createInputLayout(device, {
            indexBufferFormat: GfxFormat.U16_R,
            vertexAttributeDescriptors,
            vertexBufferDescriptors,
        });

        this.inputState = device.createInputState(this.inputLayout, [
            { buffer: this.vertexBuffer, byteOffset: 0, },
        ], { buffer: this.indexBuffer, byteOffset: 0 });

        return points;
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);
        this.outside.movement(sceneObjHolder, viewerInput);
    }

    public destroy(device: GfxDevice): void {
        super.destroy(device);
        device.destroyBuffer(this.vertexBuffer);
        device.destroyBuffer(this.indexBuffer);
        device.destroyInputState(this.inputState);
    }
}

export class OceanRing extends LiveActor {
    public points: WaterPoint[] = [];
    public pointsPerSegment: number = 15;
    private segmentCount: number;
    private waveHeight1: number;
    private waveHeight2: number;
    private waveTheta1: number = 0.0;
    private waveTheta2: number = 0.0;
    private arg1: number;
    private oceanRingDrawer: OceanRingDrawer;
    private oceanRingPipe: OceanRingPipe;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        connectToScene(sceneObjHolder, this, 0x22, -1, -1, DrawType.OCEAN_RING);
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initRailRider(sceneObjHolder, infoIter);
        this.initPoints(sceneObjHolder);

        const arg0 = fallback(getJMapInfoArg0(infoIter), 0);
        if (arg0 === 0) {
            this.waveHeight1 = 80.0;
            this.waveHeight2 = 100.0;
        } else if (arg0 === 1) {
            this.waveHeight1 = 50.0;
            this.waveHeight2 = 80.0;
        } else if (arg0 === 2) {
            this.waveHeight1 = 20.0;
            this.waveHeight2 = 30.0;
        }

        this.oceanRingDrawer = new OceanRingDrawer(sceneObjHolder, this);

        this.arg1 = fallback(getJMapInfoArg1(infoIter), 30);

        if (arg0 === 0)
            this.oceanRingPipe = new OceanRingPipe(zoneAndLayer, sceneObjHolder, infoIter, this);

        sceneObjHolder.create(SceneObj.WaterAreaHolder);
        sceneObjHolder.waterAreaHolder!.entryOceanRing(this);
    }

    private initPoints(sceneObjHolder: SceneObjHolder): void {
        const railTotalLength = getRailTotalLength(this);

        this.segmentCount = ((railTotalLength / 200.0) | 0) + 1;

        const segmentSize = railTotalLength / this.segmentCount;
        const edgePointNum = 2.0;

        for (let i = 0; i < this.segmentCount; i++) {
            getRailPos(scratchVec3a, this);
            calcGravityVector(sceneObjHolder, this, scratchVec3a, scratchVec3a);
            vec3.negate(scratchVec3a, scratchVec3a);
            getRailDirection(scratchVec3b, this);

            // Right vector.
            vec3.cross(scratchVec3c, scratchVec3b, scratchVec3a);
            vec3.normalize(scratchVec3c, scratchVec3c);

            const railCoord = getRailCoord(this);
            const widthRate = this.calcCurrentWidthRate(railCoord);
            const flowSpeedRate = this.calcCurrentFlowSpeedRate(railCoord);

            for (let j = -7; j <= 7; j++) {
                getRailPos(scratchVec3b, this);
                const width = (1200.0/7.0) * j;
                vec3.scaleAndAdd(scratchVec3b, scratchVec3b, scratchVec3c, widthRate * width);

                const edgePointIdx = 7 - Math.abs(j);
                const height = edgePointIdx < edgePointNum ? getEaseOutValue(edgePointIdx / edgePointNum, 0.0, 1.0, 1.0) : 1.0;
                const waterPoint = new WaterPoint(scratchVec3b, scratchVec3a, width, i * segmentSize, height, flowSpeedRate);
                this.points.push(waterPoint);
            }

            moveCoord(this, segmentSize);
        }
    }

    private updatePoints(): void {
        // TODO(jstpierre): Accurate heightScale?
        for (let i = 0; i < this.points.length; i++)
            this.points[i].updatePos(this.waveTheta1, this.waveTheta2, this.waveHeight1, this.waveHeight2, 1.0);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        super.initAfterPlacement(sceneObjHolder);

        for (let i = 0; i < this.points.length; i++)
            this.points[i].initAfterPlacement(sceneObjHolder);
    }

    private calcNearestPos(dstPos: vec3, dstDir: vec3 | null, pos: vec3): number {
        let bestDistance: number = Infinity;
        let bestSegmentIdx = 0;
        let bestPoint: WaterPoint | null = null;

        for (let i = 0; i < this.segmentCount; i++) {
            const p = this.points[i * 15 + 7];
            const dist = vec3.distance(p.originalPos, pos);
            if (dist < bestDistance) {
                bestSegmentIdx = i;
                bestDistance = dist;
                bestPoint = p;
            }
        }

        assert(bestPoint !== null);

        if (bestSegmentIdx < 1 || bestSegmentIdx >= this.segmentCount - 1) {
            vec3.copy(dstPos, bestPoint.originalPos);
            return 0.0;
        }

        // Search between segments.
        const prevSeg = this.points[(bestSegmentIdx - 1) * 15 + 7];
        const nextSeg = this.points[(bestSegmentIdx + 1) * 15 + 7];

        const prevDist = vec3.distance(prevSeg.originalPos, pos);
        const nextDist = vec3.distance(nextSeg.originalPos, pos);

        const baseCoord = bestSegmentIdx * 200.0;
        let coord: number = baseCoord;

        if (nextDist <= prevDist) {
            coord = baseCoord + calcPerpendicFootToLine(dstPos, pos, bestPoint.originalPos, nextSeg.originalPos);
        } else {
            coord = baseCoord - calcPerpendicFootToLine(dstPos, pos, bestPoint.originalPos, prevSeg.originalPos);
        }

        if (dstDir !== null)
            calcRailDirectionAtCoord(dstDir, this, coord);

        return coord;
    }

    public isInWater(sceneObjHolder: SceneObjHolder, pos: vec3): boolean {
        const coord = this.calcNearestPos(scratchVec3, null, pos);
        const width = 1200.0 * this.calcCurrentWidthRate(coord);

        if (vec3.distance(scratchVec3, pos) > width)
            return false;

        vec3.sub(scratchVec3a, pos, scratchVec3);
        calcGravityVector(sceneObjHolder, this, pos, scratchVec3b);
        if (vec3.dot(scratchVec3a, scratchVec3b) < 0)
            return false;

        return true;
    }

    public calcWaterInfo(dst: WaterInfo, pos: vec3, gravity: vec3): void {
        this.calcNearestPos(scratchVec3a, scratchVec3b, pos);
        vec3.sub(scratchVec3a, pos, scratchVec3a);
        vec3.negate(scratchVec3b, gravity);
        dst.depth = -vecKillElement(scratchVec3a, scratchVec3a, scratchVec3b);
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);

        const deltaTimeFrames = getDeltaTimeFrames(viewerInput);
        this.waveTheta2 += -0.06 * deltaTimeFrames;
        this.waveTheta1 += -0.04 * deltaTimeFrames;
        this.updatePoints();

        if (this.oceanRingDrawer !== null)
            this.oceanRingDrawer.update(deltaTimeFrames);
    }

    public draw(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        super.draw(sceneObjHolder, renderInstManager, viewerInput);

        if (!isValidDraw(this))
            return;

        if (this.oceanRingDrawer !== null)
            this.oceanRingDrawer.draw(sceneObjHolder, renderInstManager, viewerInput);
    }

    private calcCurrentFlowSpeedRate(coord: number): number {
        setRailCoord(this, coord);
        calcDistanceToCurrentAndNextRailPoint(scratchVec2, this);

        const totalDist = scratchVec2[0] + scratchVec2[1];
        if (totalDist >= 1.0) {
            const currRate = fallback(this.railRider!.getCurrentPointArg('point_arg0'), 100.0);
            const nextRate = fallback(this.railRider!.getNextPointArg('point_arg0'), 100.0);
            const normRate = ((currRate * scratchVec2[1]) + (nextRate * scratchVec2[0])) / totalDist;
            return normRate / 100.0;
        } else {
            return 1.0;
        }
    }

    public calcCurrentWidthRate(coord: number, normalWidth: number = 1200.0): number {
        setRailCoord(this, coord);
        calcDistanceToCurrentAndNextRailPoint(scratchVec2, this);

        const totalDist = scratchVec2[0] + scratchVec2[1];
        if (totalDist >= 1.0) {
            const scale = (normalWidth / 100.0);
            const currRate = fallback(this.railRider!.getCurrentPointArg('point_arg1'), scale);
            const nextRate = fallback(this.railRider!.getNextPointArg('point_arg1'), scale);
            const normRate = ((currRate * scratchVec2[1]) + (nextRate * scratchVec2[0])) / totalDist;
            return normRate / scale;
        } else {
            return 1.0;
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('WaterWave');

        const arg0 = fallback(getJMapInfoArg0(infoIter), 0);
        if (arg0 === 0) {
            sceneObjHolder.modelCache.requestObjectData('OceanRing');

            if (getObjectName(infoIter) === 'OceanRingAndFlag')
                sceneObjHolder.modelCache.requestObjectData('FlagSurfing');
        }

        WaterAreaHolder.requestArchives(sceneObjHolder);
    }

    public destroy(device: GfxDevice): void {
        super.destroy(device);
        this.oceanRingDrawer.destroy(device);
    }
}

class FlagFixPoints {
    public position = vec3.create();
    public points: SwingRopePoint[] = [];
}

export class Flag extends LiveActor {
    // Flags are an NxM grid of points, similar to a standard cloth simulation. To
    // make the explanation easier, we will consider typical horizontal flags, with
    // the left edge affixed to a pole. FlagFixPoints are the points on the fixed edge,
    // run vertically along the pole, with N evenly spaced hoistPerPoint units apart.
    // Each FlagFixPoints then has swingPointCount SwingRopePoints, spaced flyPerPoint
    // units apart, which are the cloth simulation points.

    private fixPoints: FlagFixPoints[] = [];
    private fixPointCount: number;
    private swingPointCount: number;
    private colors: Uint32Array;
    private poleHeight: number = 0.0;
    private flyPerPoint: number = 0.0;
    private hoistPerPoint: number = 0.0;
    private axisX: vec3 = vec3.fromValues(0, 0, 0);
    private axisY: vec3 = vec3.fromValues(0, 1, 0);
    private windDirection: vec3 = vec3.fromValues(0, 0, 1);
    private vertical: boolean = false;
    private animCounter: number = 0.0;
    private noColorTint: boolean = false;
    private texture: BTIData;

    private affectGravity: number = 0.1;
    private affectWindConst: number = 0.1;
    private affectWindWave: number = 10.0;
    private affectRndmMin: number = 1.0;
    private affectRndmMax: number = 4.0;
    private dragMin: number = 0.6;
    private dragMax: number = 1.0;

    private ddraw = new TDDraw();
    private materialHelper: GXMaterialHelperGfx;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter | null, objectName: string | null = null) {
        super(zoneAndLayer, sceneObjHolder, objectName !== null ? objectName : getObjectName(infoIter!));

        connectToScene(sceneObjHolder, this, 0x22, -1, -1, DrawType.FLAG);

        this.fixPointCount = 10;
        this.swingPointCount = 10;
        this.flyPerPoint = 40.0;
        this.hoistPerPoint = 40.0;

        if (infoIter !== null) {
            initDefaultPos(sceneObjHolder, this, infoIter);
            this.poleHeight = fallback(getJMapInfoArg1(infoIter), 0.0);

            const flagName = this.name;
            if (flagName === 'FlagKoopaCastle') {
                this.flyPerPoint = 1000.0 / this.swingPointCount;
                this.hoistPerPoint = 500.0 / (this.fixPointCount - 1);
            } else if (flagName === 'FlagKoopaA') {
                this.flyPerPoint = 450.0 / this.swingPointCount;
                this.hoistPerPoint = 275.0 / (this.fixPointCount - 1);
            } else if (flagName === 'FlagKoopaB') {
                this.flyPerPoint = 450.0 / this.swingPointCount;
                this.hoistPerPoint = 112.5 / (this.fixPointCount - 1);
            } else if (flagName === 'FlagPeachCastleA') {
                this.fixPointCount = 5;
                this.swingPointCount = 6;
                this.flyPerPoint = 160.0 / 6;
                // this.minDistAlpha = 200.0;
                // this.maxDistAlpha = 500.0;
                this.hoistPerPoint = 145.0 / 4;
                this.vertical = true;
                this.affectGravity = 0.5;
                this.dragMin = 0.85;
                this.dragMax = 1.0;
                this.affectWindWave = 0.0;
                this.affectWindConst = 0.01;
                this.affectRndmMin = 0.5;
                this.affectRndmMax = 1.5;
            } else if (flagName === 'FlagPeachCastleB') {
                this.fixPointCount = 5;
                this.swingPointCount = 5;
                this.flyPerPoint = 500.0 / 5;
                this.hoistPerPoint = 400.0 / 4;
            } else if (flagName === 'FlagPeachCastleC') {
                this.fixPointCount = 5;
                this.swingPointCount = 5;
                this.flyPerPoint = 500.0 / 5;
                this.hoistPerPoint = 400.0 / 4;
            } else if (flagName === 'FlagRaceA' || flagName === 'FlagTamakoro' || flagName === 'Flag') {
                // Nothing to do.
            } else {
                throw "whoops";
            }

            calcActorAxis(null, this.axisY, this.windDirection, this);

            this.init(sceneObjHolder);
        }

        this.ddraw.setVtxDesc(GX.Attr.POS, true);
        this.ddraw.setVtxDesc(GX.Attr.CLR0, true);
        this.ddraw.setVtxDesc(GX.Attr.TEX0, true);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.POS, GX.CompCnt.POS_XYZ);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.CLR0, GX.CompCnt.CLR_RGBA);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.TEX0, GX.CompCnt.TEX_ST);

        const mb = new GXMaterialBuilder('Flag');
        mb.setChanCtrl(GX.ColorChannelID.COLOR0A0, false, GX.ColorSrc.VTX, GX.ColorSrc.VTX, 0x00, GX.DiffuseFunction.NONE, GX.AttenuationFunction.NONE);
        mb.setTexCoordGen(GX.TexCoordID.TEXCOORD0, GX.TexGenType.MTX2x4, GX.TexGenSrc.TEX0, GX.TexGenMatrix.IDENTITY);

        mb.setTevOrder(0, GX.TexCoordID.TEXCOORD0, GX.TexMapID.TEXMAP0, GX.RasColorChannelID.COLOR0A0);
        mb.setTevColorIn(0, GX.CC.ZERO, GX.CC.TEXC, GX.CC.RASC, GX.CC.ZERO);
        mb.setTevColorOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, false, GX.Register.PREV);
        mb.setTevAlphaIn(0, GX.CA.ZERO, GX.CA.TEXA, GX.CA.A0, GX.CA.ZERO);
        mb.setTevAlphaOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, false, GX.Register.PREV);
        mb.setBlendMode(GX.BlendMode.BLEND, GX.BlendFactor.SRCALPHA, GX.BlendFactor.INVSRCALPHA, GX.LogicOp.NOOP);
        mb.setAlphaCompare(GX.CompareType.GREATER, 0, GX.AlphaOp.OR, GX.CompareType.GREATER, 0);
        mb.setZMode(true, GX.CompareType.LEQUAL, true);

        mb.setUsePnMtxIdx(false);

        this.materialHelper = new GXMaterialHelperGfx(mb.finish());
    }

    public setInfoPos(name: string, position: vec3, windDirection: vec3, poleHeight: number, width: number, height: number, swingPointCount: number, fixPointCount: number): void {
        this.name = name;

        vec3.copy(this.translation, position);
        vec3.copy(this.windDirection, windDirection);

        this.poleHeight = poleHeight;
        if (swingPointCount > 0)
            this.swingPointCount = swingPointCount;
        if (fixPointCount > 0)
            this.fixPointCount = fixPointCount;

        this.flyPerPoint = width / this.swingPointCount;
        this.hoistPerPoint = height / (this.fixPointCount - 1);
    }

    public init(sceneObjHolder: SceneObjHolder): void {
        if (this.name === 'FlagSurfing')
            this.noColorTint = true;

        assert(this.fixPoints.length === 0);

        for (let i = 0; i < this.fixPointCount; i++) {
            const fp = new FlagFixPoints();

            const pointIdxUp = this.fixPointCount - 1 - i;
            vec3.scaleAndAdd(scratchVec3, this.translation, this.axisY, this.poleHeight + this.hoistPerPoint * pointIdxUp);

            vec3.copy(fp.position, scratchVec3);

            for (let j = 0; j < this.swingPointCount; j++) {
                if (this.vertical) {
                    const y = this.flyPerPoint * (j + 1);
                    vec3.scaleAndAdd(scratchVec3, fp.position, this.gravityVector, y);
                }

                const sp = new SwingRopePoint(scratchVec3);
                fp.points.push(sp);
            }

            this.fixPoints.push(fp);
        }

        this.colors = new Uint32Array(this.fixPointCount * (this.swingPointCount + 1));
        for (let i = 0; i < this.colors.length; i++)
            this.colors[i] = 0xFFFFFFFF;

        const arc = sceneObjHolder.modelCache.getObjectData(this.name);
        this.texture = loadBTIData(sceneObjHolder, arc, `${this.name}.bti`);
    }

    private drawPolePoint(offsX: number, offsZ: number, top: number, g: number): void {
        vec3.set(scratchVec3a, offsX * 5.0, 0.0, offsZ * 5.0);
        vec3.add(scratchVec3a, this.translation, scratchVec3a);
        vec3.scaleAndAdd(scratchVec3b, scratchVec3a, this.axisY, top);

        this.ddraw.position3vec3(scratchVec3b);
        this.ddraw.color4rgba8(GX.Attr.CLR0, 0x00, g, 0x00, 0x00);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 0.0, 0.0);

        this.ddraw.position3vec3(scratchVec3a);
        this.ddraw.color4rgba8(GX.Attr.CLR0, 0x00, g, 0x00, 0x00);
        this.ddraw.texCoord2f32(GX.Attr.TEX0, 0.0, 0.0);
    }

    private getColorIdx(y: number, x: number): number {
        return y * (this.swingPointCount + 1) + x;
    }

    public draw(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        super.draw(sceneObjHolder, renderInstManager, viewerInput);

        if (!isValidDraw(this))
            return;

        this.ddraw.beginDraw();

        for (let i = 1; i < this.fixPoints.length; i++) {
            this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);

            const fp0 = this.fixPoints[i - 1], fp1 = this.fixPoints[i];
            const txT0 = (i - 1) / (this.fixPoints.length - 1);
            const txT1 = i / (this.fixPoints.length - 1);

            this.ddraw.position3vec3(fp0.position);
            colorFromRGBA8(scratchColor, this.colors[this.getColorIdx(i - 1, 0)]);
            this.ddraw.color4color(GX.Attr.CLR0, scratchColor);
            this.ddraw.texCoord2f32(GX.Attr.TEX0, 0, txT0);

            this.ddraw.position3vec3(fp1.position);
            colorFromRGBA8(scratchColor, this.colors[this.getColorIdx(i, 0)]);
            this.ddraw.color4color(GX.Attr.CLR0, scratchColor);
            this.ddraw.texCoord2f32(GX.Attr.TEX0, 0, txT1);

            for (let j = 0; j < this.swingPointCount; j++) {
                const sp0 = fp0.points[j], sp1 = fp1.points[j];
                const txS = (j + 1) / (this.swingPointCount);

                this.ddraw.position3vec3(sp0.position);
                colorFromRGBA8(scratchColor, this.colors[this.getColorIdx(i - 1, j + 1)]);
                this.ddraw.color4color(GX.Attr.CLR0, scratchColor);
                this.ddraw.texCoord2f32(GX.Attr.TEX0, txS, txT0);
    
                this.ddraw.position3vec3(sp1.position);
                colorFromRGBA8(scratchColor, this.colors[this.getColorIdx(i, j + 1)]);
                this.ddraw.color4color(GX.Attr.CLR0, scratchColor);
                this.ddraw.texCoord2f32(GX.Attr.TEX0, txS, txT1);
            }

            this.ddraw.end();
        }

        if (this.poleHeight > 0) {
            this.ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);

            const top = this.poleHeight + this.hoistPerPoint * (this.fixPointCount - 1);
            this.drawPolePoint( 1.0, 0.0, top, 0xC8);
            this.drawPolePoint( 0.0, 1.0, top, 0xDC);
            this.drawPolePoint(-1.0, 0.0, top, 0xB4);
            this.drawPolePoint( 1.0, 0.0, top, 0xC8);

            this.ddraw.end();
        }

        const device = sceneObjHolder.modelCache.device;
        const renderInst = this.ddraw.endDraw(device, renderInstManager);

        this.texture.fillTextureMapping(materialParams.m_TextureMapping[0]);
        colorFromRGBA8(materialParams.u_Color[ColorKind.C0], 0xFFFFFFFF);

        const materialHelper = this.materialHelper;
        const offs = renderInst.allocateUniformBuffer(ub_MaterialParams, materialHelper.materialParamsBufferSize);
        materialHelper.fillMaterialParamsDataOnInst(renderInst, offs, materialParams);
        renderInst.setSamplerBindingsFromTextureMappings(materialParams.m_TextureMapping);
        renderInst.allocateUniformBuffer(ub_PacketParams, ub_PacketParamsBufferSize);
        mat4.copy(packetParams.u_PosMtx[0], viewerInput.camera.viewMatrix);
        fillPacketParamsData(renderInst.mapUniformBufferF32(ub_PacketParams), renderInst.getUniformBufferOffset(ub_PacketParams), packetParams);
        materialHelper.setOnRenderInst(device, renderInstManager.gfxRenderCache, renderInst);

        renderInstManager.submitRenderInst(renderInst);
    }

    private updateFlag(camera: Camera): void {
        vec3.cross(this.axisX, this.windDirection, this.axisY);
        vec3.normalize(this.axisX, this.axisX);

        // Camera fade alpha
        // mpTranslationPtr
        // mpBaseMtx

        // Base acceleration
        vec3.scale(scratchVec3a, this.gravityVector, this.affectGravity);
        for (let i = 0; i < this.fixPoints.length; i++) {
            const fp = this.fixPoints[i];
            for (let j = 0; j < fp.points.length; j++) {
                // Apply gravity
                const sp = fp.points[j];
                sp.addAccel(scratchVec3a);

                // Apply wind
                const windTheta = Math.abs(Math.sin(MathConstants.DEG_TO_RAD * (this.animCounter + (10.0 * i) + (10.0 * j))));
                const windStrength = this.affectWindConst + (windTheta * this.affectWindWave);
                vec3.scale(scratchVec3b, this.windDirection, windStrength);
                sp.addAccel(scratchVec3b);
            }
        }

        // Random acceleration
        if (this.vertical) {
            // Vertical flags give a swing point some acceleration every few frames.
            if (getRandomInt(0, 2) === 0) {
                const fpi = getRandomInt(0, this.fixPointCount);
                const spi = getRandomInt(0, this.swingPointCount);

                vec3.set(scratchVec3a, getRandomFloat(-1.0, 1.0), 0.0, getRandomFloat(-1.0, 1.0));
                vecKillElement(scratchVec3a, scratchVec3a, this.axisY);
                vec3.scale(scratchVec3a, scratchVec3a, getRandomFloat(this.affectRndmMin, this.affectRndmMax));
                this.fixPoints[fpi].points[spi].addAccel(scratchVec3a);
            }
        } else {
            // Horizontal flags give the first swing point some random acceleration.
            for (let i = 0; i < this.fixPoints.length; i++) {
                vec3.set(scratchVec3a, getRandomFloat(-1.0, 1.0), 0.0, getRandomFloat(-1.0, 1.0));
                vec3.scale(scratchVec3a, scratchVec3a, getRandomFloat(this.affectRndmMin, this.affectRndmMax));
                this.fixPoints[i].points[0].addAccel(scratchVec3a);
            }
        }

        // Contrain height -- iterate backwards.
        for (let i = 0; i < this.swingPointCount; i++) {
            for (let j = 1; j < this.fixPoints.length; j++) {
                const p0 = this.fixPoints[j - 1].points[i], p1 = this.fixPoints[j].points[i];
                p1.restrict(p0.position, this.hoistPerPoint, p0.accel);
            }
        }

        // Constrain width.
        for (let i = 0; i < this.fixPoints.length; i++) {
            const fp = this.fixPoints[i];
            let pos = fp.position;
            for (let j = 0; j < this.swingPointCount; j++) {
                const sp = fp.points[j];
                sp.restrict(pos, this.flyPerPoint, null);
                pos = sp.position;
            }
        }

        let colorTintMinClamp = 0.0;
        if (!this.noColorTint) {
            getCamPos(scratchVec3, camera);
            const dist = vec3.distance(this.translation, scratchVec3);
            const t = saturate(invlerp(1000.0, 500.0, dist));
            colorTintMinClamp = lerp(120, 200, t);
        }

        // Update position & colors.
        for (let i = 0; i < this.fixPoints.length; i++) {
            const fp = this.fixPoints[i];
            for (let j = 0; j < this.swingPointCount; j++) {
                const drag = lerp(this.dragMin, this.dragMax, 1.0 - (j / (this.swingPointCount - 1)));
                const sp = fp.points[j];
                sp.updatePos(drag);

                if (!this.noColorTint) {
                    const dot = vec3.dot(sp.axisY, this.axisX);
                    const int = clamp(255.0 * ((dot + 1.0) / 1.5), colorTintMinClamp, 255.0);
                    this.colors[this.getColorIdx(i, j + 1)] = int << 24 | int << 16 | int << 8 | 0xFF;
                }
            }
        }
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);

        this.animCounter += getDeltaTimeFrames(viewerInput) * 5.0;

        this.updateFlag(viewerInput.camera);
    }

    public destroy(device: GfxDevice): void {
        super.destroy(device);
        this.ddraw.destroy(device);
        this.texture.destroy(device);
    }
}

const enum ElectricRailType {
    Normal0,
    Normal1,
    Moving0,
    Moving1,
    Count,
}

interface ElectricRailBase extends LiveActor {
    type: ElectricRailType;
    drawRail(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, materialParams: MaterialParams, viewerInput: Viewer.ViewerRenderInput): void;
}

function createAdaptorAndConnectToDrawBloomModel(sceneObjHolder: SceneObjHolder, name: string, drawCallback: (sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput) => void): NameObjAdaptor {
    const adaptor = new NameObjAdaptor(sceneObjHolder, name);
    adaptor.drawCallback = drawCallback;
    connectToScene(sceneObjHolder, adaptor, -1, -1, -1, DrawType.BLOOM_MODEL);
    return adaptor;
}

// This is originally a LiveActor, but I think it can just be a NameObj without loss of functionality...
export class ElectricRailHolder extends NameObj {
    private models: (ModelObj | null)[] = nArray(ElectricRailType.Count, () => null);
    private rails: ElectricRailBase[] = [];

    constructor(sceneObjHolder: SceneObjHolder) {
        super(sceneObjHolder, 'ElectricRailHolder');
        connectToScene(sceneObjHolder, this, 0x23, 5, -1, DrawType.ELECTRIC_RAIL_HOLDER);

        createAdaptorAndConnectToDrawBloomModel(sceneObjHolder, 'ElectricRailHolder Bloom', this.draw.bind(this));
    }

    public calcAnim(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.calcAnim(sceneObjHolder, viewerInput);

        for (let i = 0; i < this.models.length; i++) {
            const modelObj = this.models[i];
            if (modelObj === null)
                continue;

            modelObj.calcAnim(sceneObjHolder, viewerInput);
        }
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);

        for (let i = 0; i < this.models.length; i++) {
            const modelObj = this.models[i];
            if (modelObj === null)
                continue;

            modelObj.movement(sceneObjHolder, viewerInput);
        }
    }

    public draw(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        super.draw(sceneObjHolder, renderInstManager, viewerInput);

        const device = sceneObjHolder.modelCache.device, cache = renderInstManager.gfxRenderCache;
        for (let i = 0; i < ElectricRailType.Count; i++) {
            const modelObj = this.models[i];
            if (modelObj === null)
                continue;

            const template = renderInstManager.pushTemplateRenderInst();

            const modelInstance = modelObj.modelInstance!;
            mat4.copy(packetParams.u_PosMtx[0], viewerInput.camera.viewMatrix);
            template.allocateUniformBuffer(ub_PacketParams, ub_PacketParamsBufferSize);
            modelInstance.shapeInstances[0].shapeData.shapeHelpers[0].fillPacketParams(packetParams, template);

            const materialInstance = modelInstance.materialInstances[0];
            materialInstance.setOnRenderInst(device, cache, template);

            for (let j = 0; j < this.rails.length; j++) {
                const rail = this.rails[j]!;
                if (rail.type !== i)
                    continue;

                if (!rail.visibleScenario || !rail.visibleAlive)
                    continue;

                materialInstance.fillOnMaterialParams(materialParams, modelInstance.materialInstanceState, viewerInput.camera, modelInstance.modelMatrix, viewerInput.viewport, packetParams);

                // TODO(jstpierre): Do this in one TDDraw?
                const railTemplate = renderInstManager.pushTemplateRenderInst();
                railTemplate.setSamplerBindingsFromTextureMappings(materialParams.m_TextureMapping);
                const offs = materialInstance.materialHelper.allocateMaterialParams(railTemplate);
                rail.drawRail(sceneObjHolder, renderInstManager, materialParams, viewerInput);
                materialInstance.materialHelper.fillMaterialParamsDataOnInst(railTemplate, offs, materialParams);
                renderInstManager.popTemplateRenderInst();
            }

            renderInstManager.popTemplateRenderInst();
        }
    }

    public registerRail(sceneObjHolder: SceneObjHolder, rail: ElectricRailBase): void {
        this.createModel(sceneObjHolder, rail.type);
        this.rails.push(rail);
    }

    private createModel(sceneObjHolder: SceneObjHolder, type: ElectricRailType): void {
        if (this.models[type] !== null)
            return;

        if (type === ElectricRailType.Normal0) {
            const modelObj = new ModelObj(dynamicSpawnZoneAndLayer, sceneObjHolder, 'ElectricRailModel', 'ElectricRail', null, -1, -1, -1);
            startBtk(modelObj, 'ElectricRail');
            startBrk(modelObj, 'ElectricRail');
            setBrkFrameAndStop(modelObj, 0.0);
            this.models[type] = modelObj;
        } else if (type === ElectricRailType.Normal1) {
            const modelObj = new ModelObj(dynamicSpawnZoneAndLayer, sceneObjHolder, 'ElectricRailModel', 'ElectricRail', null, -1, -1, -1);
            startBtk(modelObj, 'ElectricRail');
            startBrk(modelObj, 'ElectricRail');
            setBrkFrameAndStop(modelObj, 1.0);
            this.models[type] = modelObj;
        } else if (type === ElectricRailType.Moving0) {
            const modelObj = new ModelObj(dynamicSpawnZoneAndLayer, sceneObjHolder, 'ElectricRailModel', 'ElectricRailMoving', null, -1, -1, -1);
            startBtk(modelObj, 'ElectricRailMoving');
            startBrk(modelObj, 'ElectricRailMoving');
            setBrkFrameAndStop(modelObj, 0.0);
            this.models[type] = modelObj;
        } else if (type === ElectricRailType.Moving1    ) {
            const modelObj = new ModelObj(dynamicSpawnZoneAndLayer, sceneObjHolder, 'ElectricRailModel', 'ElectricRailMoving', null, -1, -1, -1);
            startBtk(modelObj, 'ElectricRailMoving');
            startBrk(modelObj, 'ElectricRailMoving');
            setBrkFrameAndStop(modelObj, 1.0);
            this.models[type] = modelObj;
        }
    }
}

class ElectricRailPoint extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder) {
        super(zoneAndLayer, sceneObjHolder, 'ElectricRailPoint');

        this.initModelManagerWithAnm(sceneObjHolder, 'ElectricRailPoint');
        connectToSceneMapObjDecoration(sceneObjHolder, this);
    }
}

function makeAxisFrontUp(axisRight: vec3, axisUp: vec3, front: vec3, up: vec3): void {
    vec3.cross(axisRight, up, front);
    vec3.normalize(axisRight, axisRight);
    vec3.cross(axisUp, front, axisRight);
}

function makeAxisVerticalZX(axisRight: vec3, front: vec3): void {
    vec3.scaleAndAdd(axisRight, Vec3UnitZ, front, -vec3.dot(front, Vec3UnitZ));
    if (isNearZeroVec3(axisRight, 0.001))
        vec3.scaleAndAdd(axisRight, Vec3UnitX, front, -vec3.dot(front, Vec3UnitX));
    vec3.normalize(axisRight, axisRight);
}

function makeAxisCrossPlane(axisRight: vec3, axisUp: vec3, front: vec3): void {
    makeAxisVerticalZX(axisRight, front);
    vec3.cross(axisUp, front, axisRight);
    vec3.normalize(axisUp, axisUp);
}

class ElectricRailSeparator {
    public position = vec3.create();
    public right = vec3.create();
    public up = vec3.create();
    public front = vec3.create();
    public gravity = vec3.create();

    public setup(): void {
        vec3.negate(this.front, this.front);
        vec3.negate(scratchVec3a, this.gravity);

        if (!isSameDirection(scratchVec3a, this.front, 0.01)) {
            makeAxisFrontUp(this.right, this.up, this.front, scratchVec3a);
        } else {
            makeAxisCrossPlane(this.right, this.up, this.front);
        }
    }
}

export class ElectricRail extends LiveActor implements ElectricRailBase {
    public type: ElectricRailType;
    private height: number;
    private points: ElectricRailPoint[] = [];
    private separators: ElectricRailSeparator[] = [];
    private useGlobalGravity: boolean = false;
    private size = 30.0;
    private ddraw = new TSDraw();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'ElectricRail');

        this.type = fallback(getJMapInfoArg3(infoIter), 0);
        connectToSceneMapObjMovement(sceneObjHolder, this);
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.height = fallback(getJMapInfoArg0(infoIter), 1);
        this.initRailRider(sceneObjHolder, infoIter);

        this.useGlobalGravity = getJMapInfoBool(fallback(getJMapInfoArg4(infoIter), -1));
        if (this.useGlobalGravity)
            calcGravityVector(sceneObjHolder, this, this.translation, this.gravityVector);

        this.initPoints(sceneObjHolder);
        this.initSeparators(sceneObjHolder);

        sceneObjHolder.create(SceneObj.ElectricRailHolder);
        sceneObjHolder.electricRailHolder!.registerRail(sceneObjHolder, this);

        this.ddraw.setVtxDesc(GX.Attr.POS, true);
        this.ddraw.setVtxDesc(GX.Attr.TEX0, true);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.POS, GX.CompCnt.POS_XYZ);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.TEX0, GX.CompCnt.TEX_ST);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        super.initAfterPlacement(sceneObjHolder);
        this.drawAndUploadRail(sceneObjHolder);
    }

    private initPoints(sceneObjHolder: SceneObjHolder): void {
        const railPointCount = getRailPointNum(this);

        for (let i = 0; i < railPointCount; i++) {
            const hidePoint = fallback(this.railRider!.getPointArg(i, 'point_arg0'), -1) !== -1;
            if (hidePoint)
                continue;

            for (let j = 0; j < this.height; j++) {
                const point = new ElectricRailPoint(this.zoneAndLayer, sceneObjHolder);
                calcRailPointPos(point.translation, this, i);

                if (j >= 1) {
                    this.calcGravity(sceneObjHolder, scratchVec3, point.translation);
                    vec3.scaleAndAdd(point.translation, point.translation, scratchVec3, -100.0 * j);
                }

                this.points.push(point);
            }
        }
    }

    private initSeparators(sceneObjHolder: SceneObjHolder): void {
        const separatorCount = ((getRailTotalLength(this) / 200.0) | 0) + 1;
        for (let i = 0; i < separatorCount; i++) {
            if (i === separatorCount - 1) {
                if (isLoopRail(this))
                    moveCoordToStartPos(this);
                else
                    moveCoordToEndPos(this);
            } else {
                setRailCoord(this, 200.0 * i);
            }

            const separator = new ElectricRailSeparator();
            getRailPos(separator.position, this);
            this.calcGravity(sceneObjHolder, separator.gravity, separator.position);
            if (isNearZeroVec3(separator.gravity, 0.001))
                vec3.set(separator.gravity, 0.0, -1.0, 0.0);
            getRailDirection(separator.front, this);
            separator.setup();
            this.separators.push(separator);
        }

        moveCoordToStartPos(this);
    }

    private calcGravity(sceneObjHolder: SceneObjHolder, dst: vec3, coord: vec3): void {
        if (this.useGlobalGravity) {
            vec3.copy(dst, this.gravityVector);
        } else {
            calcGravityVector(sceneObjHolder, this, coord, dst);
        }
    }

    private drawPlane(ddraw: TSDraw, x0: number, y0: number, x1: number, y1: number): void {
        for (let i = 0; i < this.height; i++) {
            const y = 100.0 * i;

            ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);

            for (let j = 0; j < this.separators.length; j++) {
                const separator = this.separators[j];

                vec3.scaleAndAdd(scratchVec3, separator.position, separator.up, y);
                const tx = 0.5 * j;

                vec3.scaleAndAdd(scratchVec3a, scratchVec3, separator.right, x0);
                vec3.scaleAndAdd(scratchVec3a, scratchVec3a, separator.up, y0);
                ddraw.position3vec3(scratchVec3a);
                ddraw.texCoord2f32(GX.Attr.TEX0, tx, 0.0);

                vec3.scaleAndAdd(scratchVec3a, scratchVec3, separator.right, x1);
                vec3.scaleAndAdd(scratchVec3a, scratchVec3a, separator.up, y1);
                ddraw.position3vec3(scratchVec3a);
                ddraw.texCoord2f32(GX.Attr.TEX0, tx, 1.0);
            }

            ddraw.end();
        }
    }

    private drawAndUploadRail(sceneObjHolder: SceneObjHolder): void {
        this.ddraw.beginDraw();

        this.drawPlane(this.ddraw, this.size, this.size, -this.size, -this.size);
        this.drawPlane(this.ddraw, -this.size, this.size, this.size, -this.size);

        const modelCache = sceneObjHolder.modelCache;
        this.ddraw.endDraw(modelCache.device, modelCache.cache);
    }

    public drawRail(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, materialParams: MaterialParams, viewerInput: Viewer.ViewerRenderInput): void {
        const renderInst = renderInstManager.newRenderInst();
        this.ddraw.setOnRenderInst(renderInst);
        renderInstManager.submitRenderInst(renderInst);
    }

    public destroy(device: GfxDevice): void {
        this.ddraw.destroy(device);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);

        sceneObjHolder.modelCache.requestObjectData('ElectricRailPoint');
    }
}

export class ElectricRailMoving extends LiveActor implements ElectricRailBase {
    public type: ElectricRailType;
    private segmentCount: number;
    private speed: number;
    private height: number;
    private visibleSegmentLength: number;
    private separators: vec3[] = [];
    private points: ElectricRailPoint[] = [];
    private size = 30.0;
    private ddraw = new TSDraw();
    private coordPhaseAnim: number = 0.0;
    private alpha: number = 1.0;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'ElectricRailMoving');

        this.type = ElectricRailType.Moving0 + fallback(getJMapInfoArg4(infoIter), 0);
        connectToSceneMapObjMovement(sceneObjHolder, this);
        // initMapToolInfo
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.segmentCount = fallback(getJMapInfoArg0(infoIter), 10);
        this.speed = fallback(getJMapInfoArg1(infoIter), 10.0);
        this.height = fallback(getJMapInfoArg3(infoIter), 1);
        // initRail
        this.initRailRider(sceneObjHolder, infoIter);
        const segmentLength = getJMapInfoArg2(infoIter);
        if (segmentLength !== null)
            this.visibleSegmentLength = segmentLength;
        else
            this.visibleSegmentLength = getRailTotalLength(this) / (this.segmentCount * 2);

        const separatorCount = ((getRailTotalLength(this) / 100.0) | 0) + 2;
        for (let i = 0; i < separatorCount; i++) {
            const pos = vec3.create();
            const coord = Math.min(i * 100.0, getRailTotalLength(this));
            calcRailPosAtCoord(pos, this, coord);
            this.separators.push(pos);
        }

        this.initPoints(sceneObjHolder);

        sceneObjHolder.create(SceneObj.ElectricRailHolder);
        sceneObjHolder.electricRailHolder!.registerRail(sceneObjHolder, this);

        this.ddraw.setVtxDesc(GX.Attr.POS, true);
        this.ddraw.setVtxDesc(GX.Attr.TEX0, true);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.POS, GX.CompCnt.POS_XYZ);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.TEX0, GX.CompCnt.TEX_ST);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        super.initAfterPlacement(sceneObjHolder);
        this.drawAndUploadRail(sceneObjHolder);
    }

    private initPoints(sceneObjHolder: SceneObjHolder): void {
        const pointCount = this.segmentCount * 2 * this.height;

        for (let i = 0; i < pointCount; i++)
            this.points.push(new ElectricRailPoint(this.zoneAndLayer, sceneObjHolder));

        if (!isLoopRail(this)) {
            for (let j = 0; j < this.height; j++) {
                const startPoint = new ElectricRailPoint(this.zoneAndLayer, sceneObjHolder);
                this.points.push(startPoint);
                calcRailStartPointPos(startPoint.translation, this);
                if (j >= 1) {
                    calcGravityVector(sceneObjHolder, this, startPoint.translation, scratchVec3);
                    vec3.scaleAndAdd(startPoint.translation, startPoint.translation, scratchVec3, -100.0 * j);
                }

                const endPoint = new ElectricRailPoint(this.zoneAndLayer, sceneObjHolder);
                this.points.push(endPoint);
                calcRailEndPointPos(endPoint.translation, this);
                if (j >= 1) {
                    calcGravityVector(sceneObjHolder, this, endPoint.translation, scratchVec3);
                    vec3.scaleAndAdd(endPoint.translation, endPoint.translation, scratchVec3, -100.0 * j);
                }
            }
        }

        this.updatePointPos(sceneObjHolder);
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);
        this.move(sceneObjHolder, viewerInput);
    }

    private getRepeatedCoord(coord: number): number {
        return mod(coord, getRailTotalLength(this));
    }

    private calcPointPos(dst: vec3, coord: number): void {
        const idx = (coord / 100.0) | 0;

        let divisor = 100.0;
        if (idx > this.separators.length - 3)
            divisor = getRailTotalLength(this) - (100.0 * idx);

        const t = (coord % 100.0) / divisor;
        vec3.lerp(dst, this.separators[idx], this.separators[idx + 1], t);
    }

    private updatePointPos(sceneObjHolder: SceneObjHolder): boolean {
        let coord = this.coordPhaseAnim;
        const coordStep = getRailTotalLength(this) / this.segmentCount;

        let pointIdx = 0;
        let capsVisible: boolean = false;
        for (let i = 0; i < this.segmentCount; i++) {
            const startCoord = this.getRepeatedCoord(coord);
            const endCoord = this.getRepeatedCoord(coord - this.visibleSegmentLength);

            for (let j = 0; j < this.height; j++) {
                const startPoint = this.points[pointIdx++];
                this.calcPointPos(startPoint.translation, startCoord);
                if (j >= 1) {
                    calcGravityVector(sceneObjHolder, this, startPoint.translation, scratchVec3);
                    vec3.scaleAndAdd(startPoint.translation, startPoint.translation, scratchVec3, -100.0 * j);
                }

                const endPoint = this.points[pointIdx++];
                this.calcPointPos(endPoint.translation, endCoord);
                if (j >= 1) {
                    calcGravityVector(sceneObjHolder, this, endPoint.translation, scratchVec3);
                    vec3.scaleAndAdd(endPoint.translation, endPoint.translation, scratchVec3, -100.0 * j);
                }
            }

            if (!isLoopRail(this)) {
                const nextCoord = this.getRepeatedCoord(coord + this.speed);
                if (nextCoord < (this.visibleSegmentLength + 3.0 * this.speed))
                    capsVisible = true;
            }

            coord += coordStep;
        }

        return capsVisible;
    }

    private updatePointPosAndModel(sceneObjHolder: SceneObjHolder): void {
        const capsVisible = this.updatePointPos(sceneObjHolder);
        if (!isLoopRail(this)) {
            const capsStart = this.points.length - this.height * 2;
            for (let i = capsStart; i < this.points.length; i++)
                this.points[i].visibleModel = capsVisible;
        }
    }

    private move(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        this.coordPhaseAnim = this.getRepeatedCoord(this.coordPhaseAnim + this.speed * getDeltaTimeFrames(viewerInput));

        const segmentLength = getRailTotalLength(this) / this.segmentCount;

        const visibleSegmentRatio = this.visibleSegmentLength / segmentLength;
        this.alpha = saturate(visibleSegmentRatio + 15.0/255.0 * Math.sin(MathConstants.TAU * visibleSegmentRatio));

        this.updatePointPosAndModel(sceneObjHolder);
    }

    private drawPlane(sceneObjHolder: SceneObjHolder, ddraw: TSDraw, x0: number, y0: number, x1: number, y1: number): void {
        const railLength = getRailTotalLength(this);

        for (let i = 0; i < this.height; i++) {
            ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);

            for (let j = 0; j < this.separators.length; j++) {
                // setVertexAttribute
                const coord = Math.min(j * 100.0, railLength);
                const tx = (0.25 * coord) / 100.0;

                calcRailDirectionAtCoord(scratchVec3a, this, coord);
                vec3.negate(scratchVec3a, scratchVec3a);
                calcGravityVector(sceneObjHolder, this, scratchVec3, scratchVec3b);
                vec3.negate(scratchVec3b, scratchVec3b);

                vec3.scaleAndAdd(scratchVec3, this.separators[j], scratchVec3b, i * 100.0);

                if (!isSameDirection(scratchVec3b, scratchVec3a, 0.01)) {
                    makeAxisFrontUp(scratchVec3c, scratchVec3b, scratchVec3a, scratchVec3b);
                } else {
                    makeAxisCrossPlane(scratchVec3c, scratchVec3b, scratchVec3a);
                }

                vec3.scaleAndAdd(scratchVec3a, scratchVec3, scratchVec3c, x0);
                vec3.scaleAndAdd(scratchVec3a, scratchVec3a, scratchVec3b, y0);
                ddraw.position3vec3(scratchVec3a);
                ddraw.texCoord2f32(GX.Attr.TEX0, tx, 0.0);

                vec3.scaleAndAdd(scratchVec3a, scratchVec3, scratchVec3c, x1);
                vec3.scaleAndAdd(scratchVec3a, scratchVec3a, scratchVec3b, y1);
                ddraw.position3vec3(scratchVec3a);
                ddraw.texCoord2f32(GX.Attr.TEX0, tx, 1.0);
            }

            ddraw.end();
        }
    }

    private drawAndUploadRail(sceneObjHolder: SceneObjHolder): void {
        this.ddraw.beginDraw();

        this.drawPlane(sceneObjHolder, this.ddraw, this.size, this.size, -this.size, -this.size);
        this.drawPlane(sceneObjHolder, this.ddraw, -this.size, this.size, this.size, -this.size);

        const modelCache = sceneObjHolder.modelCache;
        this.ddraw.endDraw(modelCache.device, modelCache.cache);
    }

    public drawRail(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, materialParams: MaterialParams, viewerInput: Viewer.ViewerRenderInput): void {
        materialParams.u_Color[ColorKind.C1].a = this.alpha;
        const mtx = materialParams.u_TexMtx[1];
        mat4.identity(mtx);
        const scale = (100.0 * this.segmentCount) / (0.25 * getRailTotalLength(this));
        mtx[0] = scale;
        mtx[12] = (-0.25 * scale * this.coordPhaseAnim) / 100.0;

        const renderInst = renderInstManager.newRenderInst();
        this.ddraw.setOnRenderInst(renderInst);
        renderInstManager.submitRenderInst(renderInst);
    }

    public destroy(device: GfxDevice): void {
        this.ddraw.destroy(device);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);

        sceneObjHolder.modelCache.requestObjectData('ElectricRailPoint');
    }
}

const enum FluffWindEffectNrv { Init, BrowWind }

class FluffWindEffect extends LiveActor<FluffWindEffectNrv> {
    private effectHostMtx = mat4.create();
    private effectName: string;
    private lifetime: number = 0;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder) {
        super(zoneAndLayer, sceneObjHolder, 'FluffWindEffect');
    }

    public initEffectInfo(sceneObjHolder: SceneObjHolder, pos: vec3, front: vec3, up: vec3, effectName: string): void {
        vec3.copy(this.translation, pos);
        connectToSceneMapObjMovement(sceneObjHolder, this);
        makeMtxFrontUpPos(this.effectHostMtx, front, up, pos);
        this.effectName = effectName;
        this.initEffectKeeper(sceneObjHolder, effectName);
        setEffectHostMtx(this, this.effectName, this.effectHostMtx);
        this.initNerve(FluffWindEffectNrv.Init);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: FluffWindEffectNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === FluffWindEffectNrv.Init) {
            // I think the "randomness" in the original game is just powered by clipping. Here,
            // we don't have the same clip system. Perhaps we should add it. For now, we just
            // fudge the start time a bit.
            if (isFirstStep(this))
                this.lifetime = getRandomInt(0, 600);

            if (isGreaterStep(this, this.lifetime))
                this.setNerve(FluffWindEffectNrv.BrowWind);
        } else if (currentNerve === FluffWindEffectNrv.BrowWind) {
            if (isFirstStep(this)) {
                emitEffect(sceneObjHolder, this, this.effectName);
                this.lifetime = getRandomInt(60, 240);
            }

            if (isGreaterStep(this, this.lifetime))
                this.setNerve(FluffWindEffectNrv.BrowWind);
        }
    }
}

export class FluffWind extends LiveActor {
    private effects: FluffWindEffect[] = [];

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        this.initRailRider(sceneObjHolder, infoIter);
        this.initEffectKeeper(sceneObjHolder, 'FluffWind');

        const count = ((getRailTotalLength(this) / 600.0) | 0) + 1;
        for (let i = 0; i < count; i++) {
            const effect = new FluffWindEffect(zoneAndLayer, sceneObjHolder);
            const coord = i / count * getRailTotalLength(this);
            calcRailPosAtCoord(scratchVec3a, this, coord);
            calcRailDirectionAtCoord(scratchVec3b, this, coord);
            effect.initEffectInfo(sceneObjHolder, scratchVec3a, scratchVec3b, Vec3UnitY, 'FluffWind');
            this.effects.push(effect);
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
    }
}

export class OceanFloaterLandParts extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, this.name);
        connectToSceneCollisionMapObj(sceneObjHolder, this);

        if (isConnectedWithRail(infoIter)) {
            this.initRailRider(sceneObjHolder, infoIter);
        }

        if (this.name === 'OceanFloaterTypeU') {
            // Checks whether the "Rise" flag is done. We assume it is.
            moveCoordToEndPos(this);
            moveTransToCurrentRailPos(this);

            assert(useStageSwitchWriteA(sceneObjHolder, this, infoIter));
        }

        this.makeActorAppeared(sceneObjHolder);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        if (isValidSwitchA(this))
            this.stageSwitchCtrl!.onSwitchA(sceneObjHolder);
    }
}

function isGalaxyQuickCometAppearInCurrentStage(sceneObjHolder: SceneObjHolder): boolean {
    return false;
}

const enum DossunNrv { Upper, FallSign, Falling, OnGround, Rising, }

export class Dossun extends LiveActor<DossunNrv> {
    private upperHeight: number;
    private maxUpperStep: number;
    private maxFallingStep: number;
    private maxRisingStep: number;
    private lowerPos = vec3.create();
    private upperPos = vec3.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        // initMapToolInfo
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.upperHeight = fallback(getJMapInfoArg0(infoIter), 1000.0);
        this.maxUpperStep = fallback(getJMapInfoArg1(infoIter), 180);
        vec3.copy(this.lowerPos, this.translation);
        this.initModelManagerWithAnm(sceneObjHolder, 'Dossun');
        startBva(this, 'Wait');

        connectToSceneCollisionEnemyStrongLight(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        // this.initHitSensor();
        // this.initCollisionParts();
        this.initEffectKeeper(sceneObjHolder, null);
        // this.initSound();
        // this.initShadow();
        this.initNerve(DossunNrv.Upper);
        // setClippingTypeSphereContainsModelBoundingBox

        this.calcParameters(sceneObjHolder);
    }

    private calcParameters(sceneObjHolder: SceneObjHolder): void {
        vec3.set(scratchVec3, 0.0, this.upperHeight, 0.0);
        transformVec3Mat4w0(scratchVec3, this.getBaseMtx()!, scratchVec3);
        vec3.add(this.upperPos, this.lowerPos, scratchVec3);

        const fallingSpeed = isGalaxyQuickCometAppearInCurrentStage(sceneObjHolder) ? 70.0 : 30.0;
        this.maxFallingStep = this.upperHeight / fallingSpeed;

        const risingSpeed = isGalaxyQuickCometAppearInCurrentStage(sceneObjHolder) ? 70.0 : 25.0;
        this.maxRisingStep = this.upperHeight / risingSpeed;
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: DossunNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === DossunNrv.Upper) {
            if (isFirstStep(this))
                vec3.copy(this.translation, this.upperPos);

            if (isGreaterStep(this, this.maxUpperStep))
                this.setNerve(DossunNrv.FallSign);
        } else if (currentNerve === DossunNrv.FallSign) {
            if (isFirstStep(this)) {
                startBck(this, 'FallStart');
                startBva(this, 'Attack');

                if (isGalaxyQuickCometAppearInCurrentStage(sceneObjHolder)) {
                    setBckRate(this, 2.5);
                    setBvaRate(this, 2.5);
                }

                // startSound
            }

            if (isBckStopped(this))
                this.setNerve(DossunNrv.Falling);
        } else if (currentNerve === DossunNrv.Falling) {
            const t = getEaseInValue(this.getNerveStep(), 0.0, 1.0, this.maxFallingStep);
            vec3.lerp(this.translation, this.upperPos, this.lowerPos, t);

            // startLevelSound
            if (isGreaterStep(this, this.maxFallingStep))
                this.setNerve(DossunNrv.OnGround);
        } else if (currentNerve === DossunNrv.OnGround) {
            if (isFirstStep(this)) {
                vec3.copy(this.translation, this.lowerPos);
                // startRumbleWithShakeCameraNormalWeak
                // startSound
                emitEffect(sceneObjHolder, this, 'Land');
            }

            const step = isGalaxyQuickCometAppearInCurrentStage(sceneObjHolder) ? 120 : 48;
            if (isGreaterStep(this, step))
                this.setNerve(DossunNrv.Rising);
        } else if (currentNerve === DossunNrv.Rising) {
            if (isFirstStep(this))
                startBva(this, 'Wait');

            const t = getEaseInOutValue(this.getNerveStep(), 0.0, 1.0, this.maxRisingStep);
            vec3.lerp(this.translation, this.lowerPos, this.upperPos, t);
            // startLevelSound
            if (isGreaterStep(this, this.maxRisingStep)) {
                // startSound
                this.setNerve(DossunNrv.Upper);
            }
        }
    }
}

const enum TsukidashikunNrv { Relax, WaitForward, SignForward, MoveForward, WaitBack, SignBack, MoveBack }

export class Tsukidashikun extends MapObjActor<TsukidashikunNrv> {
    private speed: number;
    private waitStep: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo<TsukidashikunNrv>();
        initInfo.setupDefaultPos();
        initInfo.setupConnectToScene();
        initInfo.setupEffect(null);
        // initInfo.setupSound(4);
        initInfo.setupNerve(TsukidashikunNrv.WaitBack);
        initInfo.initLightControl = true;
        initInfo.lightType = LightType.Strong;
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);
        this.speed = fallback(getJMapInfoArg0(infoIter), 10.0);
        this.waitStep = fallback(getJMapInfoArg0(infoIter), 120);
        moveCoordToNearestPos(this);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: TsukidashikunNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === TsukidashikunNrv.MoveForward || currentNerve === TsukidashikunNrv.MoveBack) {
            moveCoordAndFollowTrans(this, this.speed * deltaTimeFrames);
            if (isRailReachedGoal(this)) {
                reverseRailDirection(this);
                if (currentNerve === TsukidashikunNrv.MoveForward)
                    this.setNerve(TsukidashikunNrv.WaitForward);
                else
                    this.setNerve(TsukidashikunNrv.WaitBack);
            }
        } else if (currentNerve === TsukidashikunNrv.WaitForward || currentNerve === TsukidashikunNrv.WaitBack) {
            if (isFirstStep(this)) {
                if (currentNerve === TsukidashikunNrv.WaitForward)
                    startBva(this, 'FWait');
                else
                    startBva(this, 'BWait');
            }

            if (isGreaterStep(this, this.waitStep)) {
                if (currentNerve === TsukidashikunNrv.WaitForward)
                    this.setNerve(TsukidashikunNrv.SignBack);
                else
                    this.setNerve(TsukidashikunNrv.SignForward);
            }
        } else if (currentNerve === TsukidashikunNrv.SignForward || currentNerve === TsukidashikunNrv.SignBack) {
            if (isFirstStep(this)) {
                startBck(this, 'Sign');
                if (currentNerve === TsukidashikunNrv.SignForward)
                    startBva(this, 'FSign');
                else
                    startBva(this, 'BSign');
            }

            if (isGreaterStep(this, 60)) {
                setBckFrameAndStop(this, 0.0);
                if (currentNerve === TsukidashikunNrv.SignForward)
                    this.setNerve(TsukidashikunNrv.MoveForward);
                else
                    this.setNerve(TsukidashikunNrv.MoveBack);
            }
        }
    }
}

const enum PlantMemberNrv { Wait, Hint }

class PlantMember extends LiveActor<PlantMemberNrv> {
    public hasItem: boolean = false;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, modelName: string, useLightCtrl: boolean) {
        // CutBushModelObj::CutBushModelObj()
        super(zoneAndLayer, sceneObjHolder, modelName);

        this.initModelManagerWithAnm(sceneObjHolder, modelName);
        connectToSceneNoSilhouettedMapObjWeakLightNoMovement(sceneObjHolder, this);

        if (useLightCtrl)
            this.initLightCtrl(sceneObjHolder);

        // initSound

        // PlantMember::init()
        this.initNerve(PlantMemberNrv.Wait);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: PlantMemberNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === PlantMemberNrv.Hint) {
            if (isFirstStep(this))
                startBck(this, 'HintShake');
            if (isBckStopped(this))
                this.setNerve(PlantMemberNrv.Wait);
        }
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        // TODO(jstpierre): updateLightCtrlDirect
    }

    public initPosture(sceneObjHolder: SceneObjHolder): void {
        calcGravity(sceneObjHolder, this);

        if (!isSameDirection(this.gravityVector, Vec3UnitX, 0.01))
            vec3.copy(scratchVec3a, Vec3UnitX);
        else
            vec3.copy(scratchVec3a, Vec3UnitY);

        calcMtxFromGravityAndZAxis(scratchMatrix, this, this.gravityVector, scratchVec3a);

        // Rotate randomly around the gravity vector.
        const angle = getRandomFloat(-Math.PI, Math.PI);
        mat4.rotateY(scratchMatrix, scratchMatrix, angle);

        computeEulerAngleRotationFromSRTMatrix(this.rotation, scratchMatrix);
    }

    public tryEmitHint(): boolean {
        if (this.getCurrentNerve() === PlantMemberNrv.Wait) {
            this.setNerve(PlantMemberNrv.Hint);
            return true;
        } else {
            return false;
        }
    }

    public animControl(sceneObjHolder: SceneObjHolder): void {
        // TODO(jstpierre)
    }
}

export class PlantGroup extends LiveActor {
    private modelName: string;
    private count: number;
    private whichItem: number;
    private effectTranslation = vec3.create();
    private effectRotation = vec3.create();
    private members: PlantMember[] = [];
    private hintTimer: number;
    private lastHintPlant: number = 0;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        connectToScene(sceneObjHolder, this, 0x22, -1, -1, -1);
        initDefaultPos(sceneObjHolder, this, infoIter);

        if (this.name === 'FlowerGroup') {
            this.modelName = 'Flower';
        } else if (this.name === 'FlowerBlueGroup') {
            this.modelName = 'FlowerBlue';
        } else {
            this.modelName = 'CutBush';
        }

        this.count = fallback(getJMapInfoArg0(infoIter), 7);
        const itemCount = fallback(getJMapInfoArg1(infoIter), 0);
        this.whichItem = fallback(getJMapInfoArg2(infoIter), 0);

        this.initMember(sceneObjHolder, itemCount, infoIter);
        // initSound
        this.initEffectKeeper(sceneObjHolder, 'Bush');
        setEffectHostSRT(this, 'HintShakeLeaf', this.effectTranslation, this.effectRotation, null);
        // initStarPointerTarget
        // switches
        this.hintTimer = getRandomInt(3, 10) * 10;
    }

    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.control(sceneObjHolder, viewerInput);

        for (let i = 0; i < this.members.length; i++) {
            const member = this.members[i];
            member.animControl(sceneObjHolder);
            member.movement(sceneObjHolder, viewerInput);
        }

        const deltaTimeFrames = getDeltaTimeFrames(viewerInput);
        this.emitHintEffect(sceneObjHolder, deltaTimeFrames);
    }

    private emitHintEffect(sceneObjHolder: SceneObjHolder, deltaTimeFrames: number): void {
        this.hintTimer -= deltaTimeFrames;

        if (this.hintTimer <= 0) {
            this.hintTimer = 300;

            let i = this.lastHintPlant;
            while (true) {
                i = (i + 1) % this.members.length;
                const member = this.members[i];

                if (member.hasItem && member.tryEmitHint()) {
                    this.lastHintPlant = i;
                    vec3.copy(this.effectTranslation, member.translation);
                    vec3.copy(this.effectRotation, member.rotation);
                    emitEffect(sceneObjHolder, this, 'HintShakeLeaf');
                }

                if (i === this.lastHintPlant)
                    break;
            }
        }
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        super.initAfterPlacement(sceneObjHolder);

        calcGravityVector(sceneObjHolder, this, this.translation, scratchVec3);
        this.placeOnCollisionFormCircle(sceneObjHolder, scratchVec3c, scratchVec3);
        // calcBoundingSphereRadius
    }

    public makeActorAppeared(sceneObjHolder: SceneObjHolder): void {
        super.makeActorAppeared(sceneObjHolder);
        for (let i = 0; i < this.members.length; i++)
            this.members[i].makeActorAppeared(sceneObjHolder);
    }

    public makeActorDead(sceneObjHolder: SceneObjHolder): void {
        super.makeActorDead(sceneObjHolder);
        for (let i = 0; i < this.members.length; i++)
            this.members[i].makeActorDead(sceneObjHolder);
    }

    private initMember(sceneObjHolder: SceneObjHolder, itemCount: number, infoIter: JMapInfoIter): void {
        const useLightCtrl = this.modelName === 'CutBush';

        for (let i = 0; i < this.count; i++) {
            const member = new PlantMember(this.zoneAndLayer, sceneObjHolder, this.modelName, useLightCtrl);
            this.members.push(member);

            if (i < itemCount)
                member.hasItem = true;
        }

        // Shuffle around items.
        for (let i = 0; i < this.count; i++) {
            const j = getRandomInt(0, i + 1);
            const hasItem = this.members[j].hasItem;
            this.members[j].hasItem = this.members[i].hasItem;
            this.members[i].hasItem = hasItem;
        }

        this.initHitSensor();
        addHitSensorMapObj(sceneObjHolder, this, 'Plant', 16, 100.0, Vec3Zero);
    }

    private placeOnCollisionFormCircle(sceneObjHolder: SceneObjHolder, center: vec3, gravity: vec3): void {
        vec3.set(center, 0, 0, 0);

        let angle = MathConstants.TAU;
        let plantsPerRing = 0;
        let numRings = 0;
        let radius = 0.0;
        for (let i = 0; i < this.members.length; i++) {
            const member = this.members[i];

            // Build circular pattern.
            vec3.copy(scratchVec3a, Vec3UnitX);
            vec3.copy(scratchVec3b, Vec3UnitY);
            makeAxisCrossPlane(scratchVec3a, scratchVec3b, gravity);

            // Right
            vec3.scaleAndAdd(scratchVec3a, this.translation, scratchVec3a, Math.cos(angle) * radius);
            // Up
            vec3.scaleAndAdd(scratchVec3a, scratchVec3a, scratchVec3b, Math.sin(angle) * radius);

            vec3.scaleAndAdd(scratchVec3a, scratchVec3a, gravity, -100.0);
            vec3.scale(scratchVec3b, gravity, 1000.0);

            getFirstPolyOnLineToMap(sceneObjHolder, member.translation, null, scratchVec3a, scratchVec3b);
            vec3.add(center, center, member.translation);

            member.initPosture(sceneObjHolder);

            if (angle >= MathConstants.TAU) {
                // This one filled up, go to the next ring out.
                plantsPerRing += 6;
                numRings++;
                radius = 160.0 * numRings;
                angle = 0;
            } else {
                angle += MathConstants.TAU / plantsPerRing;
            }
        }

        vec3.scale(center, center, 1 / this.members.length);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder): void {
    }
}

export class MovieStarter extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        // Normally, this would play a movie when appeared and then flip the dead switch after it's dead,
        // but we want two-way synchronization, so we just sync our appear status to death and so on.

        if (useStageSwitchReadAppear(sceneObjHolder, this, infoIter)) {
            listenStageSwitchOnOffAppear(sceneObjHolder, this, this.onAppeared.bind(this), this.offAppeared.bind(this));
        }

        useStageSwitchWriteDead(sceneObjHolder, this, infoIter);
    }

    private onAppeared(sceneObjHolder: SceneObjHolder): void {
        // We appear, play the movie, and then kill ourselves.
        this.stageSwitchCtrl!.onSwitchDead(sceneObjHolder);
    }

    private offAppeared(sceneObjHolder: SceneObjHolder): void {
        // noclip special: we rewind to before we played the movie and killed ourselves.
        this.stageSwitchCtrl!.offSwitchDead(sceneObjHolder);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder): void {
    }
}

const enum WaterLeakPipeNrv { Wait, Freeze }

export class WaterLeakPipe extends LiveActor<WaterLeakPipeNrv> {
    private jointTop: mat4;
    private jointBottom: mat4;
    private pipeHeight: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, "WaterLeakPipe");

        this.jointTop = assertExists(getJointMtxByName(this, 'Top'));
        this.jointBottom = assertExists(getJointMtxByName(this, 'Bottom'));
        this.pipeHeight = fallback(getJMapInfoArg0(infoIter), 500.0);
        this.initPipeHeight();
        connectToSceneMapObj(sceneObjHolder, this);

        this.initHitSensor();
        this.initEffectKeeper(sceneObjHolder, null);

        this.initNerve(WaterLeakPipeNrv.Wait);
        this.makeActorAppeared(sceneObjHolder);
    }

    public calcAnim(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
    }

    private initPipeHeight(): void {
        calcUpVec(scratchVec3, this);
        vec3.scaleAndAdd(scratchVec3, this.translation, scratchVec3, this.pipeHeight);
        setMatrixTranslation(this.jointTop, scratchVec3);
        this.calcAndSetBaseMtxBase();
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: WaterLeakPipeNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === WaterLeakPipeNrv.Wait) {
            if (isFirstStep(this))
                emitEffect(sceneObjHolder, this, 'Splash');
        }
    }
}

const enum OnimasuNrv { Wait, Jump, WaitForStamp, Stamp }

abstract class Onimasu extends LiveActor<OnimasuNrv> {
    protected effectHostMtx = mat4.create();

    private rotationAxis = vec3.create();
    private poseQuat = quat.create();
    private poseQuatLast = quat.create();
    private poseQuatNext = quat.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initRailRider(sceneObjHolder, infoIter);
        this.initFromRailPoint(sceneObjHolder);
        this.initModelManagerWithAnm(sceneObjHolder, 'Onimasu');
        connectToSceneCollisionEnemyNoShadowedMapObjStrongLight(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initEffectKeeper(sceneObjHolder, null);
        setEffectHostMtx(this, 'Move', this.effectHostMtx);
        // initSound
        this.initHitSensor();
        // addHitSensor
        // initCollisionParts
        // initAndSetRailClipping
        // setGroupClipping
        // addBaseMatrixFollowTarget

        // onCalcGravity()
        this.calcGravityFlag = true;

        // useStageSwitchReadA
        this.initNerve(OnimasuNrv.Wait);
        useStageSwitchSleep(sceneObjHolder, this, infoIter);
        this.makeActorAppeared(sceneObjHolder);
    }

    public calcAndSetBaseMtx(): void {
        makeMtxTRFromQuatVec(this.modelInstance!.modelMatrix, this.poseQuat, this.translation);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        this.collectRailPointInfo(sceneObjHolder);
        moveCoordAndTransToRailStartPoint(this);
        setRailDirectionToEnd(this);
        this.calcAndSetBaseMtxBase();

        if (isEqualStageName(sceneObjHolder, 'FactoryGalaxy')) {
            getMatrixAxisX(this.rotationAxis, this.modelInstance!.modelMatrix);
            vec3.normalize(this.rotationAxis, this.rotationAxis);
        }

        mat4.getRotation(this.poseQuatLast, this.modelInstance!.modelMatrix);
        quat.copy(this.poseQuatNext, this.poseQuatLast);
        quat.copy(this.poseQuat, this.poseQuatLast);

        if (isEqualStageName(sceneObjHolder, 'FactoryGalaxy')) {
            const turnDirection = this.calcTurnDirection();
            if (turnDirection === -1.0)
                this.setNerve(OnimasuNrv.WaitForStamp);
        }
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: OnimasuNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === OnimasuNrv.Wait || currentNerve === OnimasuNrv.WaitForStamp) {
            const step = isGalaxyQuickCometAppearInCurrentStage(sceneObjHolder) ? 45 : 90;
            if (isGreaterEqualStep(this, step)) {
                if (currentNerve === OnimasuNrv.WaitForStamp)
                    this.setNerve(OnimasuNrv.Stamp);
                else
                    this.setNerve(OnimasuNrv.Jump);
            }
        } else if (currentNerve === OnimasuNrv.Jump) {
            if (isFirstStep(this)) {
                this.incrementNextPoint(sceneObjHolder);
                this.calcTargetPose(sceneObjHolder);
                this.startMoveInner(sceneObjHolder);
            }

            if (isGreaterEqualStep(this, 1))
                this.calcGravityFlag = false;

            this.updatePose(sceneObjHolder);
            this.updatePoseInner(sceneObjHolder, deltaTimeFrames);

            const step = this.getTimeToNextPoint(sceneObjHolder);
            if (isGreaterEqualStep(this, step)) {
                this.land(sceneObjHolder);
                if (this.calcTurnDirection() === -1.0)
                    this.setNerve(OnimasuNrv.WaitForStamp);
                else
                    this.setNerve(OnimasuNrv.Wait);
            }
        } else if (currentNerve === OnimasuNrv.Stamp) {
            if (isFirstStep(this)) {
                this.updateStompVelocity(sceneObjHolder);
            }

            const normal = this.getNextPointNormal();
            const gravityScalar = this.getGravityScalar(sceneObjHolder);
            vec3.scaleAndAdd(this.velocity, this.velocity, normal, -1.0 * gravityScalar * deltaTimeFrames);

            const step = this.getTimeToNextPoint(sceneObjHolder);
            if (isGreaterEqualStep(this, step)) {
                this.land(sceneObjHolder);
                this.setNerve(OnimasuNrv.Wait);
            }
        }
    }

    private calcTargetPose(sceneObjHolder: SceneObjHolder): void {
        const lastNormal = this.getLastPointNormal();
        const nextNormal = this.getNextPointNormal();

        if (!isSameDirection(lastNormal, nextNormal, 0.01)) {
            // Turn between the two normals.
            quat.rotationTo(scratchQuat, lastNormal, nextNormal);
            quat.getAxisAngle(this.rotationAxis, scratchQuat);
            vec3.normalize(this.rotationAxis, this.rotationAxis);
        } else if (this.calcTurnDirection() !== null) {
            // Use the turn direction parameter to figure out how to turn.
            quat.identity(scratchQuat);
            const angle = Math.PI * this.calcTurnDirection()!;
            mat4.fromRotation(scratchMatrix, angle, lastNormal);
            transformVec3Mat4w0(this.rotationAxis, scratchMatrix, this.rotationAxis);
        } else {
            quat.identity(scratchQuat);
            // Use the positions to automatically determine a turn direction.
            // TODO(jstpierre)
        }

        quat.copy(this.poseQuatLast, this.poseQuatNext);
        quat.mul(this.poseQuatNext, scratchQuat, this.poseQuatNext);
        quat.setAxisAngle(scratchQuat, this.rotationAxis, MathConstants.TAU / 4);
        quat.mul(this.poseQuatNext, scratchQuat, this.poseQuatNext);
    }

    private updatePose(sceneObjHolder: SceneObjHolder): void {
        const step = this.getTimeToNextPoint(sceneObjHolder);
        const t = saturate(this.getNerveStep() / step);
        quat.slerp(this.poseQuat, this.poseQuatLast, this.poseQuatNext, t);
    }

    private emitEffectLand(sceneObjHolder: SceneObjHolder): void {
        const nextPointNo = this.getNextPointNo();
        calcRailPointPos(scratchVec3, this, nextPointNo);

        const normal = this.getNextPointNormal();
        // Original game does -normal * 800 * 0.5, likely to center.
        vec3.scaleAndAdd(scratchVec3, scratchVec3, normal, -400.0);

        if (isSameDirection(this.rotationAxis, normal, 0.01)) {
            makeMtxUpNoSupportPos(this.effectHostMtx, normal, scratchVec3);
        } else {
            // TODO(jstpierre): makeMtxUpSidePos
            makeMtxUpFrontPos(this.effectHostMtx, normal, this.rotationAxis, scratchVec3);
        }

        emitEffect(sceneObjHolder, this, 'Move');
    }

    private land(sceneObjHolder: SceneObjHolder): void {
        this.emitEffectLand(sceneObjHolder);
        // startRumbleWithShakeCameraNormalWeak
        const nextPointNo = this.getNextPointNo();
        calcRailPointPos(this.translation, this, nextPointNo);
        vec3.set(this.velocity, 0, 0, 0);
        moveCoordToRailPoint(this, nextPointNo);
    }

    private updateStompVelocity(sceneObjHolder: SceneObjHolder): void {
        const gravityScalar = this.getGravityScalar(sceneObjHolder);
        const step = this.getTimeToNextPoint(sceneObjHolder);
        const normal = this.getNextPointNormal();
        vec3.scale(this.velocity, normal, 0.5 * gravityScalar * step);
    }

    protected calcTurnDirection(): number | null {
        const arg0 = getCurrentRailPointArg0(this);
        if (arg0 === 0)
            return 0.5;
        else if (arg0 === 1)
            return -0.5;
        else if (arg0 === 2)
            return -1.0;
        else
            return null;
    }

    protected calcGravityDir(dst: vec3): void {
        vec3.negate(dst, this.getNextPointNormal());
    }

    protected getTimeToNextPoint(sceneObjHolder: SceneObjHolder): number {
        return isGalaxyQuickCometAppearInCurrentStage(sceneObjHolder) ? 15 : 30;
    }

    protected getGravityScalar(sceneObjHolder: SceneObjHolder): number {
        return isGalaxyQuickCometAppearInCurrentStage(sceneObjHolder) ? 6.4 : 1.6;
    }

    protected abstract initFromRailPoint(sceneObjHolder: SceneObjHolder): void;
    protected abstract collectRailPointInfo(sceneObjHolder: SceneObjHolder): void;
    protected abstract incrementNextPoint(sceneObjHolder: SceneObjHolder): void;
    protected abstract startMoveInner(sceneObjHolder: SceneObjHolder): void;
    protected abstract updatePoseInner(sceneObjHolder: SceneObjHolder, deltaTimeFrames: number): void;
    protected abstract getLastPointNormal(): vec3;
    protected abstract getNextPointNormal(): vec3;
    protected abstract getNextPointNo(): number;
}

const triangleScratch = new Triangle();
function getPolygonOnRailPoint(sceneObjHolder: SceneObjHolder, dstPos: vec3, dstNrm: vec3, actor: LiveActor, pointIdx: number): void {
    calcRailPointPos(dstPos, actor, pointIdx);
    calcGravityVector(sceneObjHolder, actor, dstPos, dstNrm);
    vec3.scale(dstNrm, dstNrm, 2000.0);
    // TODO(jstpierre): getFirstPolyOnLineToMapExceptSensor
    // const hitSensor = actor.getSensor('body');
    assert(getFirstPolyOnLineToMap(sceneObjHolder, dstPos, triangleScratch, dstPos, dstNrm));
    vec3.copy(dstNrm, triangleScratch.faceNormal);
}

export class OnimasuJump extends Onimasu {
    private pointCount: number;
    private normals: vec3[];
    private nextPointNo: number = 0;

    protected initFromRailPoint(sceneObjHolder: SceneObjHolder): void {
        this.pointCount = getRailPointNum(this);
        this.normals = nArray(this.pointCount, () => vec3.create());
    }

    protected collectRailPointInfo(sceneObjHolder: SceneObjHolder): void {
        for (let i = 0; i < this.pointCount; i++)
            getPolygonOnRailPoint(sceneObjHolder, scratchVec3, this.normals[i], this, i);
    }

    protected incrementNextPoint(): void {
        this.nextPointNo++;
        if (this.nextPointNo >= getRailPointNum(this))
            this.nextPointNo = 0;
    }

    protected getLastPointNo(): number {
        let lastPointNo = this.nextPointNo - 1;
        if (lastPointNo < 0)
            lastPointNo += getRailPointNum(this);
        return lastPointNo;
    }

    protected getLastPointNormal(): vec3 {
        return this.normals[this.getLastPointNo()];
    }

    protected getNextPointNo(): number {
        return this.nextPointNo;
    }

    protected getNextPointNormal(): vec3 {
        return this.normals[this.nextPointNo];
    }

    protected updatePoseInner(sceneObjHolder: SceneObjHolder, deltaTimeFrames: number): void {
        this.calcGravityDir(scratchVec3);
        vec3.scaleAndAdd(this.velocity, this.velocity, scratchVec3, deltaTimeFrames);
    }

    protected startMoveInner(sceneObjHolder: SceneObjHolder): void {
        calcRailPointPos(scratchVec3, this, this.nextPointNo);

        const distance = vec3.distance(scratchVec3, this.translation);
        const timeToNextPoint = this.getTimeToNextPoint(sceneObjHolder);
        vec3.sub(scratchVec3a, scratchVec3, this.translation);
        normToLength(scratchVec3a, distance / timeToNextPoint);

        this.calcGravityDir(scratchVec3b);
        vec3.scale(scratchVec3b, scratchVec3b, -0.5 * timeToNextPoint);

        vec3.add(this.velocity, scratchVec3a, scratchVec3b);
    }
}

const enum DriftWoodNrv { Wait }

export class DriftWood extends MapObjActor<DriftWoodNrv> {
    private front: vec3;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo<DriftWoodNrv>();
        initInfo.setupDefaultPos();
        initInfo.setupConnectToScene();
        initInfo.setupEffect(null);
        initInfo.setupNerve(DriftWoodNrv.Wait);
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);
        moveCoordAndTransToNearestRailPos(this);
        this.front = vec3.create();
        getRailDirection(this.front, this);
    }

    protected connectToScene(sceneObjHolder: SceneObjHolder): void {
        connectToSceneCollisionMapObj(sceneObjHolder, this);
    }

    public calcAndSetBaseMtx(): void {
        calcMtxFromGravityAndZAxis(this.modelInstance!.modelMatrix, this, this.gravityVector, this.front);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: DriftWoodNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === DriftWoodNrv.Wait) {
            if (isFirstStep(this) && !isEffectValid(this, 'Ripple'))
                emitEffect(sceneObjHolder, this, 'Ripple');
            moveCoordAndFollowTrans(this, 3.0);
            rotateVecDegree(this.front, this.gravityVector, 0.05);
            // this.tryVibrate();
        }
    }
}

const enum UFOBaseNrv { Wait, Move, WaitForPlayerOn }

class UFOBase extends LiveActor<UFOBaseNrv> {
    private front = vec3.create();
    private railMover: MapPartsRailMover | null = null;
    private rotateSpeed: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, this.name);
        connectToSceneCollisionMapObj(sceneObjHolder, this);
        // this.initSensorType()
        // initCollisionParts(sceneObjHolder, this, this.name, sensor);
        this.initEffectKeeper(sceneObjHolder, null);

        if (isConnectedWithRail(infoIter)) {
            this.initRailRider(sceneObjHolder, infoIter);
            this.railMover = new MapPartsRailMover(sceneObjHolder, this, infoIter);
        }
        // setClippingTypeSphereContainsModelBoundingBox
        // setGroupClipping

        useStageSwitchWriteB(sceneObjHolder, this, infoIter);
        useStageSwitchWriteDead(sceneObjHolder, this, infoIter);
        useStageSwitchSleep(sceneObjHolder, this, infoIter);

        // addBaseMatrixFollowTarget
        this.initSubModel();

        calcFrontVec(this.front, this);
        this.rotateSpeed = fallback(infoIter.getValueNumber('RotateSpeed'), 0) * 0.01;

        const moveConditionType = getMapPartsArgMoveConditionType(infoIter);
        if (moveConditionType === MoveConditionType.Unconditionally) {
            this.initNerve(UFOBaseNrv.Wait);
        } else {
            this.initNerve(UFOBaseNrv.WaitForPlayerOn);
        }
    }

    private initSubModel(): void {
        // LodCtrl
        // Bloom
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: UFOBaseNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === UFOBaseNrv.Wait) {
            if (!isValidSwitchB(this) || isOnSwitchB(sceneObjHolder, this))
                this.setNerve(UFOBaseNrv.Move);
        } else if (currentNerve === UFOBaseNrv.Move) {
            if (isFirstStep(this)) {
                if (this.railMover !== null)
                    this.railMover.start();
            }

            rotateVecDegree(this.front, this.gravityVector, this.rotateSpeed);
        }
    }

    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.control(sceneObjHolder, viewerInput);

        // this.moveLimitParts.setMtx();
        // this.lodCtrl.update();

        // startLevelSound

        if (this.railMover !== null) {
            this.railMover.movement(sceneObjHolder, viewerInput);
            vec3.copy(this.translation, this.railMover.translation);
        }
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder): void {
        calcUpVec(scratchVec3, this);
        makeMtxUpFrontPos(this.modelInstance!.modelMatrix, scratchVec3, this.front, this.translation);
    }
}

export class UFOSolid extends UFOBase {
    // Nothing.
}

export class UFOBreakable extends UFOBase {
    // TODO(jstpierre): Finish.
}

const enum UFOKinokoNrv { Wait }

export class UFOKinoko extends MapObjActor<UFOKinokoNrv> {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo();
        initInfo.setupDefaultPos();
        initInfo.setupConnectToScene();
        initInfo.setupEffect(null);
        initInfo.setupRailMover();
        initInfo.setupRotator();
        // initInfo.setupBaseMtxFolowTarget();
        initInfo.setupNerve(UFOKinokoNrv.Wait);
        setupInitInfoColorChangeArg0(initInfo, infoIter);
        // setupNoUseLodCtrl
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);
        this.rotator!.start();
    }

    public initCaseUseSwitchB(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.initCaseUseSwitchB(sceneObjHolder, infoIter);
        listenStageSwitchOnOffB(sceneObjHolder, this, this.startMove.bind(this), this.stopMove.bind(this));
    }

    private startMove(): void {
        if (this.railMover !== null)
            this.railMover.start();
    }

    private stopMove(): void {
        // TODO(jstpierre)
        // if (this.railMover !== null)
        //     this.railMover.stop();
    }
}

const enum SideSpikeMoveStepNrv { Wait }

export class SideSpikeMoveStep extends MapObjActor<SideSpikeMoveStepNrv> {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const initInfo = new MapObjActorInitInfo<SideSpikeMoveStepNrv>();
        initInfo.setupDefaultPos();
        initInfo.setupConnectToScene();
        initInfo.setupRailMover();
        initInfo.setupNerve(SideSpikeMoveStepNrv.Wait);
        setupInitInfoTypical(initInfo, getObjectName(infoIter));
        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);
        this.initEffectKeeper(sceneObjHolder, null);
        // StarPointerTarget / AnimScaleController / WalkerStateBindStarPointer
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: SideSpikeMoveStepNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === SideSpikeMoveStepNrv.Wait) {
            if (isFirstStep(this))
                this.startMapPartsFunctions(sceneObjHolder);
        }
    }
}

export class Pole extends LiveActor {
    private height: number = 0;
    private useSquareEndCap: boolean = false;
    private noModel: boolean = false;
    private square: boolean = false;
    private baseMtx: mat4 | null = null;

    private topMtx: mat4 | null = null;
    private bottomMtx: mat4 | null = null;
    private axisX = vec3.create();
    private axisY = vec3.create();
    private axisZ = vec3.create();
    private topPos = vec3.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);

        this.useSquareEndCap = getJMapInfoBool(fallback(getJMapInfoArg0(infoIter), -1));

        this.height = 100.0 * this.scale[1];
        vec3.set(this.scale, 1, 1, 1);

        if (this.name.includes('NoModel')) {
            this.noModel = true;
        } else if (this.name.includes('Square')) {
            this.square = true;
        }

        makeMtxTRFromActor(scratchMatrix, this);
        calcMtxAxis(this.axisX, this.axisY, this.axisZ, scratchMatrix);

        if (!this.noModel) {
            this.initModelManagerWithAnm(sceneObjHolder, this.name);
            // initCollisionParts
        } else {
            this.baseMtx = mat4.clone(scratchMatrix);
            // initCollisionPartsFromResourceHolder
        }

        if (this.name === 'Pole' || this.name === 'PoleSquare') {
            this.topMtx = assertExists(getJointMtxByName(this, 'PoleTop'));
            this.bottomMtx = assertExists(getJointMtxByName(this, 'PoleBottom'));

            if (this.name === 'Pole' && !this.useSquareEndCap)
                hideMaterial(this, 'PoleTopStopMat_v');

            this.updateTopPos(this.height);
        } else {
            if (this.name === 'TreeCube')
                this.height = 800.0;

            vec3.scaleAndAdd(this.topPos, this.translation, this.axisY, this.height);

            if (!this.noModel)
                this.bottomMtx = assertExists(getJointMtxByName(this, 'world_root'));
        }

        if (!this.noModel) {
            setMtxAxisXYZ(this.bottomMtx!, this.axisX, this.axisY, this.axisZ);
            setMatrixTranslation(this.bottomMtx!, this.translation);
        }

        if (!this.noModel)
            connectToSceneMapObj(sceneObjHolder, this);
        else
            connectToSceneMapObjMovement(sceneObjHolder, this);
    }

    private updateTopPos(height: number): void {
        if (this.square)
            height += 100.0;

        vec3.scaleAndAdd(this.topPos, this.translation, this.axisY, height);

        setMtxAxisXYZ(this.topMtx!, this.axisX, this.axisY, this.axisZ);
        setMatrixTranslation(this.topMtx!, this.topPos);
    }

    public calcAnim(sceneObjHolder: SceneObjHolder): void {
        // updateMaterial
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        const name = getObjectName(infoIter);
        if (name === 'Pole' || name === 'PoleNoModel')
            sceneObjHolder.modelCache.requestObjectData('Pole');
        else if (name === 'PoleSquare' || name === 'PoleSquareNoModel')
            sceneObjHolder.modelCache.requestObjectData('PoleSquare');
        else if (name === 'TreeCube')
            sceneObjHolder.modelCache.requestObjectData('TreeCube');
    }
}

class Sun extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter | null) {
        super(zoneAndLayer, sceneObjHolder, "Sun");

        this.initModelManagerWithAnm(sceneObjHolder, 'Sun');
        connectToSceneSun(sceneObjHolder, this);
        this.makeActorAppeared(sceneObjHolder);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('Sun');
    }
}

export class BrightSun extends LiveActor {
    private brightObj = new BrightObjBase();
    private checkArg = new BrightObjCheckArg();
    private sun: Sun;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, "BrightSun");

        initDefaultPos(sceneObjHolder, this, infoIter);
        connectToScene(sceneObjHolder, this, 0x21, -1, -1, DrawType.BRIGHT_SUN);

        this.sun = new Sun(zoneAndLayer, sceneObjHolder, null);

        if (useStageSwitchReadAppear(sceneObjHolder, this, infoIter)) {
            syncStageSwitchAppear(sceneObjHolder, this);
            this.makeActorDead(sceneObjHolder);
        } else {
            this.makeActorAppeared(sceneObjHolder);
        }

        addBrightObj(sceneObjHolder, this.brightObj);
    }

    protected offScenario(sceneObjHolder: SceneObjHolder): void {
        // Force the bright object to turn off.
        super.offScenario(sceneObjHolder);
        this.brightObj.isFullyHidden = true;
    }

    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        if (sceneObjHolder.lensFlareDirector === null)
            return;

        getCamPos(scratchVec3, viewerInput.camera);

        computeModelMatrixSRT(scratchMatrix, 1, 1, 1, this.rotation[0], this.rotation[1], this.rotation[2], scratchVec3[0], scratchVec3[1], scratchVec3[2]);
        vec3.set(scratchVec3, 0.0, 0.0, 100000.0);
        mat4.translate(scratchMatrix, scratchMatrix, scratchVec3);
        getMatrixTranslation(this.translation, scratchMatrix);

        this.controlSunModel(sceneObjHolder, viewerInput);

        this.brightObj.checkVisibilityOfSphere(sceneObjHolder, this.checkArg, this.translation, 3000.0, viewerInput);
    }

    private controlSunModel(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        vec3.copy(this.sun.translation, this.translation);
        vec3.set(this.sun.scale, -100.0, 100.0, 100.0);

        getCamPos(scratchVec3, viewerInput.camera);
        vec3.sub(scratchVec3, scratchVec3, this.translation);
        vec3.normalize(scratchVec3, scratchVec3);

        quatSetRotate(scratchQuat, Vec3UnitZ, scratchVec3);
        mat4.fromQuat(scratchMatrix, scratchQuat);

        computeEulerAngleRotationFromSRTMatrix(this.sun.rotation, scratchMatrix);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        Sun.requestArchives(sceneObjHolder, infoIter);
    }
}

export class BrightObj extends LiveActor {
    private brightObj = new BrightObjBase();
    private checkArg = new BrightObjCheckArg();
    private radius: number;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.radius = fallback(getJMapInfoArg0(infoIter), 100.0);
        connectToScene(sceneObjHolder, this, 0x21, -1, -1, DrawType.BRIGHT_SUN);
        this.makeActorAppeared(sceneObjHolder);
    }

    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        this.brightObj.checkVisibilityOfSphere(sceneObjHolder, this.checkArg, this.translation, this.radius, viewerInput);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
    }
}

const enum FirePressureRadiateNrv { Relax, Wait, PrepareToRadiate, Radiate, RadiateMargin, SyncWait, }

export class FirePressureRadiate extends LiveActor<FirePressureRadiateNrv> {
    private effectHostMtx = mat4.create();
    private waitStep: number;
    private radiateStep: number;
    private isLeader: boolean = false;
    private group: MsgSharedGroup<FirePressureRadiate> | null;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'FirePressureRadiate');

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'FirePressure');
        connectToSceneNoShadowedMapObjStrongLight(sceneObjHolder, this);

        this.initHitSensor();
        addHitSensorMapObj(sceneObjHolder, this, 'body', 8, 70.0, vec3.set(scratchVec3, 0.0, 30.0, 0.0));

        // addHitSensorAtJointMapObj
        // addHitSensorCallbackEnemyAttack

        this.initEffectKeeper(sceneObjHolder, null);
        setEffectHostMtx(this, 'Fire', this.effectHostMtx);
        setEffectHostMtx(this, 'FireInd', this.effectHostMtx);

        // getJMapInfoArg0
        this.waitStep = fallback(getJMapInfoArg1(infoIter), 300);
        this.radiateStep = fallback(getJMapInfoArg2(infoIter), 300);

        // TODO(jstpierre): JointController

        calcGravity(sceneObjHolder, this);
        // setGroupClipping

        this.group = joinToGroupArray(sceneObjHolder, this, infoIter, 'FirePressureRadiate', 16);

        // tryRegisterDemoCast

        if (useStageSwitchWriteA(sceneObjHolder, this, infoIter)) {
            listenStageSwitchOnOffA(sceneObjHolder, this, this.startWait.bind(this), this.startRelax.bind(this));
            this.initNerve(FirePressureRadiateNrv.Relax);
        } else {
            this.initNerve(FirePressureRadiateNrv.Wait);
        }

        useStageSwitchSleep(sceneObjHolder, this, infoIter);
        if (useStageSwitchReadAppear(sceneObjHolder, this, infoIter))
            this.makeActorDead(sceneObjHolder);
        else
            this.makeActorAppeared(sceneObjHolder);
    }

    public receiveMessage(sceneObjHolder: SceneObjHolder, messageType: MessageType, thisSensor: HitSensor | null, otherSensor: HitSensor | null): boolean {
        if (messageType === MessageType.FirePressureRadiate_StartSyncWait) {
            this.setNerve(FirePressureRadiateNrv.Wait);
            return true;
        } else if (messageType === MessageType.FirePressureRadiate_StartWait) {
            this.setNerve(FirePressureRadiateNrv.SyncWait);
            return true;
        }

        return super.receiveMessage(sceneObjHolder, messageType, thisSensor, otherSensor);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        if (this.group !== null) {
            let leader: FirePressureRadiate | null = this.group.objArray[0];

            for (let i = 1; i < this.group.objArray.length; i++)
                if (this.group.objArray[i].waitStep > leader.waitStep)
                    leader = this.group.objArray[i];

            this.isLeader = (leader === this);
        }
    }

    private calcRadiateEffectMtx(): void {
        const mtx = getJointMtxByName(this, 'Cannon3')!;
        mat4.copy(this.effectHostMtx, mtx);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: FirePressureRadiateNrv, deltaTimeFrames: number): void {
        if (currentNerve === FirePressureRadiateNrv.Wait) {
            if (isGreaterEqualStep(this, this.waitStep))
                this.setNerve(FirePressureRadiateNrv.PrepareToRadiate);
        } else if (currentNerve === FirePressureRadiateNrv.PrepareToRadiate) {
            if (isFirstStep(this))
                startBck(this, 'FireShotStart');

            if (isGreaterEqualStep(this, 34))
                this.setNerve(FirePressureRadiateNrv.Radiate);
        } else if (currentNerve === FirePressureRadiateNrv.Radiate) {
            if (isBckOneTimeAndStopped(this)) {
                this.calcRadiateEffectMtx();
                startBck(this, 'FireShot');
            }

            if (isGreaterEqualStep(this, 25)) {
                // validateHitSensor
                // reset timer
            }

            if (isGreaterEqualStep(this, this.radiateStep)) {
                this.setNerve(FirePressureRadiateNrv.RadiateMargin);
            }
        } else if (currentNerve === FirePressureRadiateNrv.RadiateMargin) {
            if (isFirstStep(this))
                startBck(this, 'FireShotEnd');

            if (isGreaterEqualStep(this, 50)) {
                // invalidateHitSensor

                if (this.group !== null)
                    this.setNerve(FirePressureRadiateNrv.SyncWait);
                else
                    this.setNerve(FirePressureRadiateNrv.Wait);

                if (this.isLeader) {
                    const sensor = this.getSensor('body')!;
                    this.group!.sendMsgToGroupMember(MessageType.FirePressureRadiate_StartSyncWait, sensor, 'body');
                }
            }
        } else if (currentNerve === FirePressureRadiateNrv.SyncWait) {
            if (this.isLeader && isGreaterEqualStep(this, 60)) {
                const sensor = this.getSensor('body')!;
                this.group!.sendMsgToGroupMember(MessageType.FirePressureRadiate_StartWait, sensor, 'body');
            }
        }
    }

    private startWait(sceneObjHolder: SceneObjHolder): void {
        if (this.getCurrentNerve() !== FirePressureRadiateNrv.Wait)
            this.setNerve(FirePressureRadiateNrv.Wait);
    }

    private startRelax(sceneObjHolder: SceneObjHolder): void {
        if (this.getCurrentNerve() !== FirePressureRadiateNrv.Relax)
            this.setNerve(FirePressureRadiateNrv.Relax);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData('FirePressure');
    }
}

export class TimerSwitch extends LiveActor {
    private timerArg: number;
    private timer: number = -1;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'TimerSwitch');

        connectToSceneMapObjMovement(sceneObjHolder, this);
        this.timerArg = assertExists(getJMapInfoArg0(infoIter));
        useStageSwitchWriteA(sceneObjHolder, this, infoIter); // needStageSwitchWriteB
        useStageSwitchWriteB(sceneObjHolder, this, infoIter); // needStageSwitchReadB
        this.makeActorAppeared(sceneObjHolder);
    }

    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        if (this.timer < 0 && isOnSwitchB(sceneObjHolder, this))
            this.timer = this.timerArg;

        if (this.timer > 0) {
            this.timer -= getDeltaTimeFrames(viewerInput);
            if (this.timer < 1.0) {
                this.stageSwitchCtrl!.onSwitchA(sceneObjHolder);
                this.makeActorDead(sceneObjHolder);
            }
        }
    }

    public static requestArchives(): void {
    }
}

export class CoconutTree extends LiveActor {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'CoconutTree');

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'CoconutTree');
        connectToSceneMapObj(sceneObjHolder, this);
        this.initHitSensor();
        // addBodyMessageSensorMapObj
        // initCollisionParts
        // setClippingTypeSphere(this, 2000.0);
        this.makeActorAppeared(sceneObjHolder);
    }
}

const enum MogucchiNrv { Stroll, Scatter, Die }

export class Mogucchi extends LiveActor<MogucchiNrv> {
    private maxStrollSpeed: number;
    private strollSpeed: number;
    private gravityStrikeVec = vec3.create();
    private isOnGround: boolean = false;
    private referenceMtx = mat4.create();

    private hole: ModelObj;
    private hill: MogucchiHill;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'Mogucchi');

        initDefaultPos(sceneObjHolder, this, infoIter);
        this.maxStrollSpeed = fallback(getJMapInfoArg0(infoIter), 5.0);
        this.initModelManagerWithAnm(sceneObjHolder, 'Mogucchi');
        connectToSceneEnemy(sceneObjHolder, this);
        // this.initSensor();
        this.initEffectKeeper(sceneObjHolder, null);

        // addEffect(this, 'PointerTouchManual'); and related jazz
        // initSound();
        this.initRailRider(sceneObjHolder, infoIter);
        // declareCoin(this, 1);
        this.initNerve(MogucchiNrv.Stroll);

        useStageSwitchWriteDead(sceneObjHolder, this, infoIter);
        // initStarPointerTargetAtJoint

        this.createMogucchiHill(zoneAndLayer, sceneObjHolder);
        this.createHole(zoneAndLayer, sceneObjHolder);

        startBck(this, 'Walk');
        startBtp(this, 'EyeOpen');
        // this.calcAnim(sceneObjHolder, viewerInput);
        this.makeActorAppeared(sceneObjHolder);
    }

    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.control(sceneObjHolder, viewerInput);

        if (this.getCurrentNerve() !== MogucchiNrv.Scatter && this.getCurrentNerve() !== MogucchiNrv.Die)
            this.updateReferenceMtx();
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: MogucchiNrv, deltaTimeFrames: number): void {
        super.updateSpine(sceneObjHolder, currentNerve, deltaTimeFrames);

        if (currentNerve === MogucchiNrv.Stroll) {
            if (isFirstStep(this)) {
                startBck(this, 'Walk');
                startBtp(this, 'EyeOpen');
                startBck(this.hole, 'Walk');
                this.hill.start(sceneObjHolder);

                this.strollSpeed = this.maxStrollSpeed;
            }

            this.strollSpeed = Math.min(this.strollSpeed + 0.1, this.maxStrollSpeed);
            moveCoord(this, this.strollSpeed * deltaTimeFrames);

            getRailPos(scratchVec3, this);
            calcGravityVector(sceneObjHolder, this, scratchVec3, this.gravityStrikeVec, null);
            this.updatePosition(sceneObjHolder);
            this.makeEulerRotation();

            // if (checkHipDrop()) ...
        }
    }

    private makeEulerRotation(): void {
        getRailDirection(scratchVec3a, this);
        vec3.negate(scratchVec3b, this.gravityStrikeVec);
        makeMtxUpFront(scratchMatrix, scratchVec3b, scratchVec3a);
        computeEulerAngleRotationFromSRTMatrix(this.rotation, scratchMatrix);
    }

    public makeActorAppeared(sceneObjHolder: SceneObjHolder): void {
        super.makeActorAppeared(sceneObjHolder);
        showModel(this);
        this.setNerve(MogucchiNrv.Stroll);
        this.hole.makeActorAppeared(sceneObjHolder);
        showModel(this.hole);
        // validateClipping(this);
    }

    public makeActorDead(sceneObjHolder: SceneObjHolder): void {
        super.makeActorDead(sceneObjHolder);

        if (isValidSwitchDead(this))
            this.stageSwitchCtrl!.onSwitchDead(sceneObjHolder);

        this.setNerve(MogucchiNrv.Die);

        if (!isDead(this.hole))
           this.hole.makeActorDead(sceneObjHolder);
    }

    private createMogucchiHill(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder): void {
        const pieceCount = Math.min(getRailTotalLength(this), 20);
        this.hill = new MogucchiHill(zoneAndLayer, sceneObjHolder, this, pieceCount);

        if (pieceCount > 5)
            this.hill.appearNum = pieceCount - 5;

        this.hill.reserveAppearDist = 80.0;
        this.hill.reserveSaveDist = 100.0;
    }

    private createHole(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder): void {
        this.hole = new ModelObj(zoneAndLayer, sceneObjHolder, 'MogucchiHole', 'MogucchiHole', this.referenceMtx, DrawBufferType.MAP_OBJ_STRONG_LIGHT, -2, -2);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        moveCoordToNearestPos(this);
        getRailPos(scratchVec3, this);
        calcGravityVector(sceneObjHolder, this, scratchVec3, this.gravityStrikeVec);
        this.updatePosition(sceneObjHolder);
        this.updateReferenceMtx();
    }

    private updatePosition(sceneObjHolder: SceneObjHolder): void {
        getRailPos(scratchVec3a, this);
        vec3.scale(scratchVec3b, this.gravityStrikeVec, 1000.0);

        this.isOnGround = getFirstPolyOnLineToMap(sceneObjHolder, this.translation, null, scratchVec3a, scratchVec3b);

        if (!this.isOnGround)
            vec3.copy(this.translation, scratchVec3a);
    }

    private updateReferenceMtx(): void {
        makeMtxTRFromActor(this.referenceMtx, this);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);
        sceneObjHolder.modelCache.requestObjectData('MogucchiHole');
        MogucchiHill.requestArchives(sceneObjHolder);
    }
}

const enum MogucchiHillNrv { Wait, Move }

class MogucchiHill extends LiveActor<MogucchiHillNrv> {
    private static pieceModelNames: string[] = [
        'MogucchiHillA',
        'MogucchiHillB',
        'MogucchiHillC',
    ];
    private pieceJointName: string = 'MogucchiHill';
    private pieceEffectName: string = 'MogucchiHill';
    private pieceUseLightCtrl: boolean = false;

    private pieces: MogucchiHillPiece[] = [];
    private pieceCanAppear: boolean = false;
    private nextAppearPiece: number = 0;
    private mode: number = 0;
    private pieceScaleTimer: number = 0;

    private reserveMtx = mat4.create();
    public appearNum: number = 0;
    public reserveAppearDist: number = 100.0;
    public reserveSaveDist: number = 150.0;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, private parentActor: LiveActor, private pieceCount: number) {
        super(zoneAndLayer, sceneObjHolder, 'MogucchiHill');

        this.pieceCount = Math.min(this.pieceCount, 100);
        this.appearNum = this.pieceCount;

        connectToSceneEnemyMovement(sceneObjHolder, this);
        this.initNerve(MogucchiHillNrv.Move);
        this.createPieces(zoneAndLayer, sceneObjHolder);
        this.makeActorDead(sceneObjHolder);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: MogucchiHillNrv, deltaTimeFrames: number): void {
        if (currentNerve === MogucchiHillNrv.Move) {
            if (isFirstStep(this))
                this.reserveCurrentMtx();

            const distance = this.getDistanceFromReserveMtx();
            if (this.pieceCanAppear && distance >= this.reserveAppearDist)
                this.appearPiece(sceneObjHolder);
            if (distance >= this.reserveSaveDist)
                this.reserveCurrentMtx();
        }
    }

    private appearPiece(sceneObjHolder: SceneObjHolder): void {
        this.killPieceOverAppear(sceneObjHolder);
        this.killPieceIfAlive(sceneObjHolder);

        if (this.mode === 1) {
            this.pieceScaleTimer++;

            if (this.pieceScaleTimer > 2) {
                this.pieceScaleTimer = 3;
                this.mode = 0;
            }
        } else if (this.mode === 2) {
            this.pieceScaleTimer--;
            if (this.pieceScaleTimer < 1) {
                this.pieceScaleTimer = 0;
                this.mode = 0;
                return;
            }
        }

        if (this.pieceScaleTimer !== 0) {
            const piece = this.pieces[this.nextAppearPiece];
            const scale = this.scale[0] * (0.6 + 0.4 * ((this.pieceScaleTimer - 1) * 0.5));
            piece.setSize(scale);

            mat4.copy(piece.baseMtx, this.reserveMtx);
            getMatrixTranslation(piece.translation, piece.baseMtx);
            piece.makeActorAppeared(sceneObjHolder);
            this.pieceCanAppear = false;

            this.nextAppearPiece = (this.nextAppearPiece + 1) % this.pieceCount;
        }
    }

    public start(sceneObjHolder: SceneObjHolder): void {
        if (isDead(this))
            this.makeActorAppeared(sceneObjHolder);

        this.setNerve(MogucchiHillNrv.Move);
        this.pieceScaleTimer = 3;
    }

    public startNaturally(sceneObjHolder: SceneObjHolder): void {
        this.mode = 1;
        this.start(sceneObjHolder);
    }

    public end(sceneObjHolder: SceneObjHolder): void {
        this.setNerve(MogucchiHillNrv.Wait);
    }

    public endNaturally(sceneObjHolder: SceneObjHolder): void {
        this.mode = 2;
        this.end(sceneObjHolder);
    }

    private killPieceOverAppear(sceneObjHolder: SceneObjHolder): void {
        const idx = (this.nextAppearPiece + this.pieceCount - this.appearNum) % this.pieceCount;
        this.pieces[idx].crumble(sceneObjHolder);
    }

    private killPieceIfAlive(sceneObjHolder: SceneObjHolder): void {
        const nextPiece = this.pieces[this.nextAppearPiece];
        if (!isDead(nextPiece))
            nextPiece.makeActorDead(sceneObjHolder);
    }

    private getDistanceFromReserveMtx(): number {
        getMatrixTranslation(scratchVec3, this.reserveMtx);
        return vec3.distance(this.parentActor.translation, scratchVec3);
    }

    private reserveCurrentMtx(): void {
        mat4.copy(this.reserveMtx, this.parentActor.getBaseMtx()!);
        this.pieceCanAppear = true;
    }

    private createPieces(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder): void {
        const pieceModelNames = MogucchiHill.pieceModelNames;

        for (let i = 0; i < this.pieceCount; i++) {
            const idx = getRandomInt(0, pieceModelNames.length - 1);
            const pieceModelName = pieceModelNames[idx];

            const piece = new MogucchiHillPiece(zoneAndLayer, sceneObjHolder, pieceModelName, this.pieceJointName, this.pieceEffectName, this.pieceUseLightCtrl);
            this.pieces.push(piece);
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder): void {
        for (let i = 0; i < this.pieceModelNames.length; i++)
            sceneObjHolder.modelCache.requestObjectData(this.pieceModelNames[i]);
    }
}

const enum MogucchiHillPieceNrv { Wait, Appear, Crumble }

class MogucchiHillPiece extends LiveActor<MogucchiHillPieceNrv> {
    public baseMtx = mat4.create();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, modelName: string, jointName: string, effectName: string | null, useLightCtrl: boolean) {
        super(zoneAndLayer, sceneObjHolder, 'MogucchiHillPiece');

        this.initModelManagerWithAnm(sceneObjHolder, modelName);
        connectToSceneMapObjDecorationStrongLight(sceneObjHolder, this);
        // this.initHitSensor();
        // addHitSensorAtJointMapObj

        if (effectName !== null)
            this.initEffectKeeper(sceneObjHolder, effectName);

        if (useLightCtrl)
            this.initLightCtrl(sceneObjHolder);

        // initSound
        this.initNerve(MogucchiHillPieceNrv.Wait);
        this.makeActorDead(sceneObjHolder);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: MogucchiHillPieceNrv, deltaTimeFrames: number): void {
        if (currentNerve === MogucchiHillPieceNrv.Wait) {
            // Nothing.
        } else if (currentNerve === MogucchiHillPieceNrv.Appear) {
            if (isFirstStep(this)) {
                showModel(this);
                startBck(this, 'Lead');
                startBrk(this, 'Normal');
                // startSound
            }

            if (isBckStopped(this))
                this.setNerve(MogucchiHillPieceNrv.Wait);
        } else if (currentNerve === MogucchiHillPieceNrv.Crumble) {
            if (isFirstStep(this)) {
                startBck(this, 'Fade');
                startBrk(this, 'Fade');
            }

            if (isBckStopped(this))
                this.makeActorDead(sceneObjHolder);
        }
    }

    public crumble(sceneObjHolder: SceneObjHolder): void {
        if (isDead(this))
            return;

        // TODO(jstpierre): If clipped, immediately destroy
        // if (isClipped(this)) {
        //    this.makeActorDead(sceneObjHolder);
        //    return;
        // }

        if (this.getCurrentNerve() !== MogucchiHillPieceNrv.Crumble)
            this.setNerve(MogucchiHillPieceNrv.Crumble);
    }

    public destroyHillPiece(sceneObjHolder: SceneObjHolder): void {
        emitEffect(sceneObjHolder, this, 'Break');
        this.makeActorDead(sceneObjHolder);
    }

    public setSize(size: number): void {
        vec3.set(this.scale, size, size, size);
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder): void {
        mat4.copy(this.modelInstance!.modelMatrix, this.baseMtx);
    }

    public makeActorAppeared(sceneObjHolder: SceneObjHolder): void {
        super.makeActorAppeared(sceneObjHolder);
        this.setNerve(MogucchiHillPieceNrv.Appear);
        hideModel(this);
    }
}

const enum AstroDomeSkyNrv { Wait }

export class AstroDomeSky extends LiveActor<AstroDomeSkyNrv> {
    private static skyNames: string[] = [
        'AstroDomeSkyA',
        'AstroDomeSkyB',
        'AstroDomeSkyC',
        'AstroDomeSkyA',
        'AstroDomeSkyB',
        'AstroDomeSkyC',
    ];

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'AstroDomeSky');

        const whichSky = assertExists(getJMapInfoArg0(infoIter)) - 1;
        this.initModelManagerWithAnm(sceneObjHolder, AstroDomeSky.skyNames[whichSky]);
        startBtk(this, AstroDomeSky.skyNames[whichSky]);
        connectToScene(sceneObjHolder, this, MovementType.Sky, 0x05, DrawBufferType.ASTRO_DOME_SKY, DrawType.ASTRO_DOME_SKY_CLEAR);
        // invalidateClipping();

        // Original code uses Hide to wait for the player to pull on the handle, we just show the sky immediately.
        this.initNerve(AstroDomeSkyNrv.Wait);
        this.makeActorAppeared(sceneObjHolder);
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        // calcHandledRotateMtx

        getCamPos(scratchVec3, viewerInput.camera);
        mat4.identity(this.modelInstance!.modelMatrix);
        setMatrixTranslation(this.modelInstance!.modelMatrix, scratchVec3);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        const whichSky = assertExists(getJMapInfoArg0(infoIter)) - 1;
        sceneObjHolder.modelCache.requestObjectData(AstroDomeSky.skyNames[whichSky]);
    }
}

const enum AstroDomeNrv { Wait }

export class AstroDome extends MapObjActor<AstroDomeNrv> {
    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        const domeId = assertExists(getJMapInfoArg0(infoIter));
        const domeModelName = AstroMapObj.getModelName('AstroDome', domeId);
        const initInfo = new MapObjActorInitInfo();
        initInfo.setupModelName(domeModelName);
        initInfo.setupNerve(AstroDomeNrv.Wait);
        setupInitInfoSimpleMapObj(initInfo);
        // setupNoAppearRiddleSE

        super(zoneAndLayer, sceneObjHolder, infoIter, initInfo);

        // invalidateClipping
        // registerTarget
        this.makeActorAppeared(sceneObjHolder);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: AstroDomeNrv, deltaTimeFrames: number): void {
        if (currentNerve === AstroDomeNrv.Wait) {
            if (isFirstStep(this)) {
                startBrk(this, 'Appear');
                setBrkFrameAndStop(this, getBrkFrameMax(this));
            }
        }
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        const domeId = assertExists(getJMapInfoArg0(infoIter));
        const domeModelName = AstroMapObj.getModelName('AstroDome', domeId);
        sceneObjHolder.modelCache.requestObjectData(domeModelName);
    }
}

export class GalaxyNameSortTable {
    private infoIter: JMapInfoIter;

    constructor(sceneObjHolder: SceneObjHolder) {
        const buffer = sceneObjHolder.modelCache.getExtraData(`ExtraNoclipData/GalaxyNameSortTable.bcsv`);
        this.infoIter = createCsvParser(buffer);
    }

    public getPowerStarNumToOpenGalaxy(name: string): number {
        assert(this.infoIter.findRecord((record) => record.getValueString('name') === name));
        return assertExists(this.infoIter.getValueNumber('PowerStarNum'));
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder) {
        // This is normally embedded in the binary itself.
        sceneObjHolder.modelCache.requestExtraData(`ExtraNoclipData/GalaxyNameSortTable.bcsv`);
    }
}

export class MiniatureGalaxyHolder extends NameObj {
    public group: LiveActorGroup<MiniatureGalaxy>;

    constructor(sceneObjHolder: SceneObjHolder) {
        super(sceneObjHolder, 'MiniatureGalaxyHolder');
        this.group = new LiveActorGroup<MiniatureGalaxy>(sceneObjHolder, 'MiniatureGalaxyHolderGroup', 64);
    }

    public registerActor(galaxy: MiniatureGalaxy): void {
        this.group.registerActor(galaxy);
        // DemoCast
    }

    public getMiniatureGalaxyNum(layerId: number): number {
        // Count the number of galaxies in our scenario.
        let count = 0;
        for (let i = 0; i < this.group.objArray.length; i++) {
            if (this.group.objArray[i].zoneAndLayer.layerId === layerId)
                count++;
        }
        return count;
    }

    public calcIndex(sceneObjHolder: SceneObjHolder, galaxy: MiniatureGalaxy): number {
        if (sceneObjHolder.galaxyNameSortTable === null)
            sceneObjHolder.galaxyNameSortTable = new GalaxyNameSortTable(sceneObjHolder);

        const galaxyNameSortTable = sceneObjHolder.galaxyNameSortTable!;
        const powerStarNum = galaxyNameSortTable.getPowerStarNumToOpenGalaxy(galaxy.galaxyName);

        let index = 0;
        for (let i = 0; i < this.group.objArray.length; i++) {
            const otherGalaxy = this.group.objArray[i];

            if (otherGalaxy.zoneAndLayer.layerId !== galaxy.zoneAndLayer.layerId) {
                // Skip galaxies not in our scenario.
                continue;
            }

            if (galaxy === otherGalaxy)
                continue;

            // Koopa Galaxies get sorted at the end.
            if (otherGalaxy.galaxyType === MiniatureGalaxyType.Boss)
                continue;

            if (galaxy.galaxyType === MiniatureGalaxyType.Boss) {
                index++;
                continue;
            }

            const otherPowerStarNum = galaxyNameSortTable.getPowerStarNumToOpenGalaxy(otherGalaxy.galaxyName);
            if (powerStarNum > otherPowerStarNum) {
                index++;
                continue;
            }
        }

        return index;
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder): void {
        GalaxyNameSortTable.requestArchives(sceneObjHolder);
    }
}

class AstroDomeOrbit extends LiveActor {
    private radius: number = 5000.0;
    private curCoord: number = 0;

    private materialHelper: GXMaterialHelperGfx;
    private ddraw = new TDDraw();
    private ddrawBloom = new TDDraw();

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder) {
        super(zoneAndLayer, sceneObjHolder, 'AstroDomeOrbit');
        connectToScene(sceneObjHolder, this, -1, -1, -1, DrawType.ASTRO_DOME_ORBIT);

        createAdaptorAndConnectToDrawBloomModel(sceneObjHolder, 'AstroDomeOrbit Bloom', this.drawBloom.bind(this));

        this.ddraw.setVtxDesc(GX.Attr.POS, true);
        this.ddraw.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.POS, GX.CompCnt.POS_XYZ);

        this.ddrawBloom.setVtxDesc(GX.Attr.POS, true);
        this.ddrawBloom.setVtxAttrFmt(GX.VtxFmt.VTXFMT0, GX.Attr.POS, GX.CompCnt.POS_XYZ);

        const mb = new GXMaterialBuilder('AstroDomeOrbit');
        mb.setChanCtrl(GX.ColorChannelID.COLOR0A0, false, GX.ColorSrc.REG, GX.ColorSrc.REG, 0, GX.DiffuseFunction.NONE, GX.AttenuationFunction.NONE);
        mb.setTevOrder(0, GX.TexCoordID.TEXCOORD_NULL, GX.TexMapID.TEXMAP_NULL, GX.RasColorChannelID.COLOR0A0);
        // GX_PASSCLR
        mb.setTevColorIn(0, GX.CC.ZERO, GX.CC.ZERO, GX.CC.ZERO, GX.CC.RASC);
        mb.setTevColorOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setTevAlphaIn(0, GX.CA.ZERO, GX.CA.ZERO, GX.CA.ZERO, GX.CA.RASA);
        mb.setTevAlphaOp(0, GX.TevOp.ADD, GX.TevBias.ZERO, GX.TevScale.SCALE_1, true, GX.Register.PREV);
        mb.setBlendMode(GX.BlendMode.BLEND, GX.BlendFactor.ONE, GX.BlendFactor.ONE);
        mb.setAlphaCompare(GX.CompareType.ALWAYS, 0, GX.AlphaOp.OR, 0, GX.AlphaOp.OR);
        mb.setZMode(true, GX.CompareType.LEQUAL, true);
        mb.setCullMode(GX.CullMode.BACK);
        this.materialHelper = new GXMaterialHelperGfx(mb.finish());
    }

    private drawOrbitPath(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput, ddraw: TDDraw, width: number, height: number, color: number): void {
        const device = sceneObjHolder.modelCache.device;
        ddraw.beginDraw();
        this.drawCeiling(ddraw, width, true, height);
        this.drawCeiling(ddraw, width, false, height);
        this.drawSide(ddraw, width, true, height);
        this.drawSide(ddraw, width, false, height);
        const renderInst = ddraw.endDraw(device, renderInstManager);

        colorFromRGBA8(materialParams.u_Color[ColorKind.MAT0], color);

        const materialHelper = this.materialHelper;
        const offs = renderInst.allocateUniformBuffer(ub_MaterialParams, materialHelper.materialParamsBufferSize);
        materialHelper.fillMaterialParamsDataOnInst(renderInst, offs, materialParams);
        renderInst.allocateUniformBuffer(ub_PacketParams, ub_PacketParamsBufferSize);
        computeModelMatrixR(packetParams.u_PosMtx[0], this.rotation[0], this.rotation[1], this.rotation[2]);
        mat4.mul(packetParams.u_PosMtx[0], viewerInput.camera.viewMatrix, packetParams.u_PosMtx[0]);
        fillPacketParamsData(renderInst.mapUniformBufferF32(ub_PacketParams), renderInst.getUniformBufferOffset(ub_PacketParams), packetParams);
        materialHelper.setOnRenderInst(device, renderInstManager.gfxRenderCache, renderInst);

        renderInstManager.submitRenderInst(renderInst);
    }

    public draw(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        if (!isValidDraw(this))
            return;

        this.drawOrbitPath(sceneObjHolder, renderInstManager, viewerInput, this.ddraw, 100.0, 50.0, 0x13B1FFFF);
    }

    private drawBloom(sceneObjHolder: SceneObjHolder, renderInstManager: GfxRenderInstManager, viewerInput: Viewer.ViewerRenderInput): void {
        if (!isValidDraw(this))
            return;

        this.drawOrbitPath(sceneObjHolder, renderInstManager, viewerInput, this.ddrawBloom, 131.0, 60.0, 0x00B464FF);
    }

    private drawCeiling(ddraw: TDDraw, width: number, top: boolean, height: number): void {
        const baseY = 0;
        const bottomY = baseY + 0.5 * height, topY = baseY - 0.5 * height;
        const outerRadius = this.radius + 0.5 * width, innerRadius = this.radius - 0.5 * width;

        const y = top ? bottomY : topY;

        ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);
        for (let i = 0; i <= 64; i++) {
            const theta = MathConstants.TAU * (i / 64);
            const sin = Math.sin(theta), cos = Math.cos(theta);

            vec3.set(scratchVec3a, cos * innerRadius, y, sin * innerRadius);
            vec3.set(scratchVec3b, cos * outerRadius, y, sin * outerRadius);

            if (top) {
                ddraw.position3vec3(scratchVec3a);
                ddraw.position3vec3(scratchVec3b);
            } else {
                ddraw.position3vec3(scratchVec3b);
                ddraw.position3vec3(scratchVec3a);
            }
        }
        ddraw.end();
    }

    private drawSide(ddraw: TDDraw, width: number, outer: boolean, height: number): void {
        const baseY = 0;
        const bottomY = baseY + 0.5 * height, topY = baseY - 0.5 * height;
        const outerRadius = this.radius + 0.5 * width, innerRadius = this.radius - 0.5 * width;

        const radius = outer ? outerRadius : innerRadius;

        ddraw.begin(GX.Command.DRAW_TRIANGLE_STRIP);
        for (let i = 0; i <= 64; i++) {
            const theta = MathConstants.TAU * (i / 64);
            const sin = Math.sin(theta), cos = Math.cos(theta);

            vec3.set(scratchVec3a, cos * radius, topY, sin * radius);
            vec3.set(scratchVec3b, cos * radius, bottomY, sin * radius);

            if (outer) {
                ddraw.position3vec3(scratchVec3b);
                ddraw.position3vec3(scratchVec3a);
            } else {
                ddraw.position3vec3(scratchVec3a);
                ddraw.position3vec3(scratchVec3b);
            }
        }
        ddraw.end();
    }

    public setup(sceneObjHolder: SceneObjHolder, layerId: number, idx: number): void {
        // Count the number of MiniatureGalaxy objects in this scenario...
        const count = sceneObjHolder.miniatureGalaxyHolder!.getMiniatureGalaxyNum(layerId);

        if (count === 4) {
            // last dome
            const radiusTable = [4000.0, 6700.0, 9100.0, 11800.0];
            this.radius = radiusTable[idx];
        } else {
            const radiusTable = [4000.0, 6200.0, 8100.0, 10300.0, 12000.0];
            this.radius = radiusTable[idx];
        }

        this.curCoord = idx * 230.0;

        if (idx > 3) {
            // Tilt rotation for outermost (Koopa) ring
            this.rotation[0] = 20.0 * MathConstants.DEG_TO_RAD;
            this.rotation[1] = 45.0 * MathConstants.DEG_TO_RAD;
            this.rotation[2] =  0.0 * MathConstants.DEG_TO_RAD;
        }
    }

    public calcGalaxyPos(dst: vec3): void {
        const theta = MathConstants.DEG_TO_RAD * (this.curCoord % 360.0);
        const sin = Math.sin(theta), cos = Math.cos(theta);

        vec3.set(dst, this.radius * cos, 0, this.radius * sin);
        computeModelMatrixR(scratchMatrix, this.rotation[0], this.rotation[1], this.rotation[2]);
        transformVec3Mat4w0(dst, scratchMatrix, dst);
    }

    public moveCoord(deltaTimeFrames: number): void {
        this.curCoord += (-0.05) * deltaTimeFrames;
    }

    public destroy(device: GfxDevice): void {
        this.ddraw.destroy(device);
        this.ddrawBloom.destroy(device);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder): void {
        MiniatureGalaxyHolder.requestArchives(sceneObjHolder);
    }
}

const enum MiniatureGalaxyNrv { Wait }

const enum MiniatureGalaxyType { Normal, ExGalaxy, Boss }

export class MiniatureGalaxy extends LiveActor<MiniatureGalaxyNrv> {
    public galaxyType: MiniatureGalaxyType;

    private originalTranslation = vec3.create();
    private shadowModel: ModelObj;
    private shadowMtx = mat4.create();
    private orbit: AstroDomeOrbit;

    public galaxyName: string;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, getObjectName(infoIter));

        // Chop off "Mini"
        this.galaxyName = getObjectName(infoIter).slice(4);

        initDefaultPos(sceneObjHolder, this, infoIter);
        vec3.copy(this.originalTranslation, this.translation);

        this.galaxyType = fallback(getJMapInfoArg0(infoIter), -1);

        const modelName = MiniatureGalaxy.getModelName(infoIter);

        this.initModelManagerWithAnm(sceneObjHolder, modelName);
        this.initEffectKeeper(sceneObjHolder, null);
        connectToSceneNoShadowedMapObj(sceneObjHolder, this);
        // initStarPointerTarget
        // invalidateClipping
        this.initPartsModel(zoneAndLayer, sceneObjHolder);
        this.initNerve(MiniatureGalaxyNrv.Wait);
        // registerDemoCast
        // registerTarget

        sceneObjHolder.create(SceneObj.MiniatureGalaxyHolder);
        sceneObjHolder.miniatureGalaxyHolder!.registerActor(this);

        this.orbit = new AstroDomeOrbit(zoneAndLayer, sceneObjHolder);
        // namePlate
        this.makeActorAppeared(sceneObjHolder);

        vec3.set(this.scale, 0.65, 0.65, 0.65);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        super.initAfterPlacement(sceneObjHolder);

        const idx = sceneObjHolder.miniatureGalaxyHolder!.calcIndex(sceneObjHolder, this);
        this.orbit.setup(sceneObjHolder, this.zoneAndLayer.layerId, idx);
    }

    public makeActorAppeared(sceneObjHolder: SceneObjHolder): void {
        super.makeActorAppeared(sceneObjHolder);
        tryStartAllAnim(this, this.name);
        this.shadowModel.makeActorAppeared(sceneObjHolder);
        startBtk(this.shadowModel, 'MiniatureGalaxyShadow');
        this.orbit.makeActorAppeared(sceneObjHolder);

        if (this.galaxyType === MiniatureGalaxyType.Boss)
            emitEffect(sceneObjHolder, this, 'EyeLight');
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.calcAndSetBaseMtx(sceneObjHolder, viewerInput);

        vec3.scaleAndAdd(scratchVec3, this.translation, Vec3UnitY, -7000.0);
        setMatrixTranslation(this.shadowMtx, scratchVec3);
    }

    protected control(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.control(sceneObjHolder, viewerInput);

        this.orbit.calcGalaxyPos(this.translation);
        this.rotation[1] += 0.4 * MathConstants.DEG_TO_RAD * getDeltaTimeFrames(viewerInput);
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: MiniatureGalaxyNrv, deltaTimeFrames: number): void {
        if (currentNerve === MiniatureGalaxyNrv.Wait) {
            if (isFirstStep(this)) {
                // Choose model to show (already done)
            }

            this.orbit.moveCoord(deltaTimeFrames);
        }
    }

    private initPartsModel(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder): void {
        // "Unknown" model for when you haven't unlocked
        this.shadowModel = new ModelObj(zoneAndLayer, sceneObjHolder, 'MiniatureGalaxyShadow', 'MiniatureGalaxyShadow', this.shadowMtx, DrawBufferType.NO_SILHOUETTED_MAP_OBJ, -2, -2);
        // Select model
        // Star Number number
    }

    private static getModelName(infoIter: JMapInfoIter): string {
        const galaxyType: MiniatureGalaxyType = fallback(getJMapInfoArg0(infoIter), -1);

        let modelName = getObjectName(infoIter);
        if (galaxyType === MiniatureGalaxyType.Boss && modelName.includes('KoopaBattleVs'))
            modelName = 'MiniKoopaGalaxy';

        return modelName;
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        sceneObjHolder.modelCache.requestObjectData(MiniatureGalaxy.getModelName(infoIter));
        sceneObjHolder.modelCache.requestObjectData('MiniatureGalaxyShadow');
        AstroDomeOrbit.requestArchives(sceneObjHolder);
    }
}

class MapObjConnector {
    public mtx = mat4.create();
    public collisionParts: CollisionParts | null = null;
    private triangle = new Triangle();

    constructor(private actor: LiveActor) {
    }

    public attach(sceneObjHolder: SceneObjHolder, v: vec3): boolean {
        vec3.scaleAndAdd(scratchVec3b, this.actor.translation, v, 50.0);
        vec3.scale(scratchVec3c, v, -500.0);
        if (!getFirstPolyOnLineToMapExceptActor(sceneObjHolder, scratchVec3, this.triangle, scratchVec3b, scratchVec3c, this.actor))
            return false;
        this.collisionParts = this.triangle.collisionParts!;
        mat4.mul(this.mtx, this.collisionParts.invWorldMtx, this.actor.getBaseMtx()!);
        return true;
    }

    public attachToBack(sceneObjHolder: SceneObjHolder): boolean {
        calcFrontVec(scratchVec3, this.actor);
        return this.attach(sceneObjHolder, scratchVec3);
    }

    public attachToUnder(sceneObjHolder: SceneObjHolder): boolean {
        calcUpVec(scratchVec3, this.actor);
        return this.attach(sceneObjHolder, scratchVec3);
    }

    public connect(actor: LiveActor = this.actor): void {
        if (this.collisionParts !== null) {
            const dstMtx = actor.modelInstance!.modelMatrix;
            mat4.mul(dstMtx, this.collisionParts.worldMtx, this.mtx);
            getMatrixTranslation(actor.translation, dstMtx);
        }
    }
}

const enum ScrewSwitchNrv { Wait, End }

export class ScrewSwitch extends LiveActor<ScrewSwitchNrv> {
    private mapObjConnector: MapObjConnector;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'ScrewSwitch');

        this.mapObjConnector = new MapObjConnector(this);

        initDefaultPos(sceneObjHolder, this, infoIter);
        useStageSwitchWriteA(sceneObjHolder, this, infoIter);
        useStageSwitchSleep(sceneObjHolder, this, infoIter);

        this.initModelManagerWithAnm(sceneObjHolder, 'ScrewSwitch');
        connectToSceneMapObjDecorationStrongLight(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initHitSensor();
        addBodyMessageSensorMapObj(sceneObjHolder, this);
        // addHitSensorAtJoint(this, 'binder', 'Screw');
        // initCollisionParts(sceneObjHolder, this, 'ScrewCol', )

        this.initEffectKeeper(sceneObjHolder, null);
        this.initNerve(ScrewSwitchNrv.Wait);
        this.makeActorAppeared(sceneObjHolder);
    }

    public initAfterPlacement(sceneObjHolder: SceneObjHolder): void {
        this.mapObjConnector.attachToUnder(sceneObjHolder);
    }

    public calcAndSetBaseMtx(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.calcAndSetBaseMtx(sceneObjHolder, viewerInput);
        this.mapObjConnector.connect();
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: ScrewSwitchNrv, deltaTimeFrames: number): void {
        if (currentNerve === ScrewSwitchNrv.Wait) {
            // Screw the switch in.
            this.setNerve(ScrewSwitchNrv.End);
        } else if (currentNerve === ScrewSwitchNrv.End) {
            if (isFirstStep(this)) {
                this.stageSwitchCtrl!.onSwitchA(sceneObjHolder);
                startBck(this, 'ScrewSwitchOn');
                setBckFrameAndStop(this, getBckFrameMax(this));
                startBrk(this, 'ScrewSwitchOn');
                setBrkFrameAndStop(this, getBrkFrameMax(this));
            }
        }
    }
}

class Button {
    private elem: HTMLElement;
    public offset = vec3.create();
    public valid: boolean = true;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, private actor: LiveActor, offset: vec3, private radius: number, private maxDistance: number = -1) {
        vec3.copy(this.offset, offset);

        this.elem = document.createElement('div');
        this.elem.style.position = 'absolute';
        this.elem.style.pointerEvents = 'auto';
        this.elem.style.cursor = 'pointer';
        this.elem.onclick = () => {
            this.actor.receiveMessage(sceneObjHolder, MessageType.NoclipButton_Click, null, null);
        };
        sceneObjHolder.uiContainer.appendChild(this.elem);
    }

    public validate(): void {
        this.valid = true;
    }

    public invalidate(): void {
        this.valid = false;
    }

    public move(sceneObjHolder: SceneObjHolder): void {
        let visible = this.valid && isValidDraw(this.actor);

        if (visible && this.maxDistance >= 0) {
            if (calcDistToCamera(this.actor, sceneObjHolder.viewerInput.camera) >= this.maxDistance)
                visible = false;
        }

        let screenX = -1, screenY = -1, screenRadius = -1;
        if (visible) {
            const camera = sceneObjHolder.viewerInput.camera;

            // View-space point
            vec3.add(scratchVec3, this.actor.translation, this.offset);
            transformVec3Mat4w1(scratchVec3b, camera.viewMatrix, scratchVec3);

            vec3.transformMat4(scratchVec3c, scratchVec3b, camera.projectionMatrix);
            screenX = (scratchVec3c[0] * 0.5 + 0.5) * window.innerWidth;
            screenY = (scratchVec3c[1] * -0.5 + 0.5) * window.innerHeight;
            if (scratchVec3c[2] > 1.0)
                visible = false;

            if (visible) {
                scratchVec3b[0] += this.radius;
                vec3.transformMat4(scratchVec3c, scratchVec3b, camera.projectionMatrix);
                screenRadius = ((scratchVec3c[0] * 0.5 + 0.5) * window.innerWidth) - screenX;
            }
        }

        const elem = this.elem;

        if (visible) {
            elem.style.left = `${screenX - screenRadius}px`;
            elem.style.top = `${screenY - screenRadius}px`;
            elem.style.width = `${screenRadius * 2}px`;
            elem.style.height = `${screenRadius * 2}px`;
            elem.style.display = 'block';
            elem.style.borderRadius = `99999px`;
        } else {
            elem.style.display = 'none';
        }
    }
}

const enum ScrewSwitchReverseNrv { Wait, Screw }

export class ScrewSwitchReverse extends LiveActor<ScrewSwitchReverseNrv> {
    private button: Button;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'ScrewSwitchReverse');

        initDefaultPos(sceneObjHolder, this, infoIter);
        useStageSwitchWriteA(sceneObjHolder, this, infoIter);
        useStageSwitchSleep(sceneObjHolder, this, infoIter);

        this.initModelManagerWithAnm(sceneObjHolder, 'ScrewSwitchReverse');
        connectToSceneMapObjDecorationStrongLight(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initHitSensor();
        addBodyMessageSensorMapObj(sceneObjHolder, this);
        // addHitSensorAtJoint(this, 'binder', 'Screw');
        // initCollisionParts(sceneObjHolder, this, 'ScrewCol', )

        this.initEffectKeeper(sceneObjHolder, null);

        // arg7 = shadow
        // arg0 = force jump

        this.initNerve(ScrewSwitchReverseNrv.Wait);
        this.makeActorAppeared(sceneObjHolder);

        vec3.set(scratchVec3, 0, 100, 0);
        this.button = new Button(zoneAndLayer, sceneObjHolder, this, scratchVec3, 120.0, 5000.0);
    }

    public movement(sceneObjHolder: SceneObjHolder, viewerInput: Viewer.ViewerRenderInput): void {
        super.movement(sceneObjHolder, viewerInput);

        this.button.move(sceneObjHolder);
    }

    public receiveMessage(sceneObjHolder: SceneObjHolder, messageType: MessageType, thisSensor: HitSensor | null, otherSensor: HitSensor | null): boolean {
        if (messageType === MessageType.NoclipButton_Click) {
            this.setNerve(ScrewSwitchReverseNrv.Screw);
            return true;
        } else {
            return super.receiveMessage(sceneObjHolder, messageType, thisSensor, otherSensor);
        }
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: ScrewSwitchReverseNrv, deltaTimeFrames: number): void {
        if (currentNerve === ScrewSwitchReverseNrv.Screw) {
            if (isFirstStep(this)) {
                startBck(this, 'ScrewSwitchReverseOn');
                this.button.invalidate();
            }

            if (isBckStopped(this)) {
                this.stageSwitchCtrl!.onSwitchA(sceneObjHolder);
                this.makeActorDead(sceneObjHolder);
            }
        }
    }
}

// Fake dumb hacky thing for noclip.
export class DemoGroupFake extends LiveActor {
    private sheetName: string;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'DemoExecutor');

        this.sheetName = assertExists(infoIter.getValueString('TimeSheetName'));

        this.initStageSwitch(sceneObjHolder, infoIter);
        if (isValidSwitchAppear(this)) {
            listenStageSwitchOnOffAppear(sceneObjHolder, this, this.switchOn.bind(this), this.switchOff.bind(this));
        }
    }

    private switchOn(sceneObjHolder: SceneObjHolder): void {
        if (this.sheetName === 'HatchWaterPlanetOpen') {
            const cast = sceneObjHolder.nameObjHolder.nameObjs.find((obj) => obj.name === 'HatchWaterPlanet') as HatchWaterPlanet | undefined;
            if (cast !== undefined)
                cast.open();
        }
    }

    private switchOff(sceneObjHolder: SceneObjHolder): void {
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder): void {
    }
}

const enum RingBeamNrv { Spread }

class RingBeam extends LiveActor<RingBeamNrv> {
    private axisZ = vec3.create();
    private farPointPos = vec3.create();
    private farPointAxisY = vec3.create();
    private bloomModel: ModelObj;
    private speed: number = 20.0;
    private life: number = 100;

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter, private parentActor: LiveActor, private useFancyPosCalc: boolean) {
        super(zoneAndLayer, sceneObjHolder, 'RingBeam');
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.initModelManagerWithAnm(sceneObjHolder, 'JumpBeamerBeam');
        connectToSceneIndirectEnemy(sceneObjHolder, this);
        // initHitSensor
        this.initEffectKeeper(sceneObjHolder, null);
        // initSound
        this.initNerve(RingBeamNrv.Spread);
        this.initPos(this);
        const baseMtx = this.getBaseMtx()!;
        getMatrixAxisZ(this.axisZ, baseMtx);
        getMatrixTranslation(this.farPointPos, baseMtx);
        // shadow
        this.bloomModel = createModelObjBloomModel(zoneAndLayer, sceneObjHolder, 'JumpBeamerBeamBloom', 'JumpBeamerBeamBloom', this.getBaseMtx()!);
        this.makeActorDead(sceneObjHolder);
    }

    public setSpeed(speed: number): void {
        this.speed = speed;
    }

    public setLife(life: number): void {
        this.life = life;
    }

    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: RingBeamNrv, deltaTimeFrames: number): void {
        if (currentNerve === RingBeamNrv.Spread) {
            if (isFirstStep(this)) {
                startBckNoInterpole(this, 'Spread');
                startBckNoInterpole(this.bloomModel, 'Spread');

                startBrk(this, 'Erase');
                setBrkFrameAndStop(this, 0);

                const baseMtx = this.parentActor.getBaseMtx()!;
                getMatrixAxisZ(this.axisZ, baseMtx);
                getMatrixAxisY(scratchVec3, baseMtx);
                vec3.scaleAndAdd(this.farPointPos, this.parentActor.translation, scratchVec3, 75.0);
            }

            if (this.useFancyPosCalc) {
                vec3.scaleAndAdd(scratchVec3, this.farPointPos, this.axisZ, this.speed * deltaTimeFrames);
                calcGravityVector(sceneObjHolder, this, scratchVec3, this.farPointAxisY);
                vec3.negate(this.farPointAxisY, this.farPointAxisY);
                makeMtxUpFront(scratchMatrix, this.farPointAxisY, this.axisZ);
                getMatrixAxisZ(this.axisZ, scratchMatrix);
                const baseMtx = this.parentActor.getBaseMtx()!;
                getMatrixAxisY(scratchVec3, baseMtx);
                vec3.scaleAndAdd(scratchVec3a, this.parentActor.translation, scratchVec3, 1.0);
                vec3.scaleAndAdd(scratchVec3b, this.parentActor.translation, scratchVec3, -1.0);
                calcPerpendicFootToLine(this.translation, this.farPointPos, scratchVec3a, scratchVec3b);
            }

            vec3.scaleAndAdd(this.farPointPos, this.farPointPos, this.axisZ, this.speed * deltaTimeFrames);
            this.setRadius(vec3.distance(this.farPointPos, this.translation));

            // transSound

            if (isGreaterEqualStep(this, this.life - getBrkFrameMax(this))) {
                startBrk(this, 'Erase');
            }

            if (isGreaterEqualStep(this, this.life))
                this.makeActorDead(sceneObjHolder);
        }
    }

    public makeActorAppeared(sceneObjHolder: SceneObjHolder): void {
        super.makeActorAppeared(sceneObjHolder);
        this.bloomModel.makeActorAppeared(sceneObjHolder);
    }

    public makeActorDead(sceneObjHolder: SceneObjHolder): void {
        this.setNerve(RingBeamNrv.Spread);
        this.initPos(this.parentActor);
        this.setRadius(0);
        super.makeActorDead(sceneObjHolder);
        this.bloomModel.makeActorDead(sceneObjHolder);
    }

    private initPos(actor: LiveActor): void {
        const baseMtx = actor.getBaseMtx()!;
        getMatrixAxisY(scratchVec3, baseMtx);
        vec3.scaleAndAdd(this.translation, actor.translation, scratchVec3, 50.0);
    }

    private setRadius(radius: number): void {
        radius = Math.min(radius, 2000.0);
        startBckNoInterpole(this, 'Spread');
        startBckNoInterpole(this.bloomModel, 'Spread');
        const frame = (radius / 2000.0) * getBckFrameMax(this);
        setBckFrameAndStop(this, frame);
        setBckFrameAndStop(this.bloomModel, frame);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder): void {
        sceneObjHolder.modelCache.requestObjectData('JumpBeamerBeam');
        sceneObjHolder.modelCache.requestObjectData('JumpBeamerBeamBloom');
    }
}

const enum BallBeamerNrv { Wait, AttackChargeWait, AttackCharging, Inter }

export class BallBeamer extends LiveActor<BallBeamerNrv> {
    private switchOnA: boolean = false;
    private ringBeams: RingBeam[] = [];

    constructor(zoneAndLayer: ZoneAndLayer, sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter) {
        super(zoneAndLayer, sceneObjHolder, 'BallBeamer');

        this.initModelManagerWithAnm(sceneObjHolder, 'BallBeamer');
        initDefaultPos(sceneObjHolder, this, infoIter);
        this.translation[1] -= 50.0;
        connectToSceneEnemy(sceneObjHolder, this);
        this.initLightCtrl(sceneObjHolder);
        this.initHitSensor();
        // addHitSensorPush
        // initShadowVolumeSphere
        this.initEffectKeeper(sceneObjHolder, null);
        this.initNerve(BallBeamerNrv.Wait);
        this.makeActorAppeared(sceneObjHolder);

        if (useStageSwitchWriteA(sceneObjHolder, this, infoIter))
            listenStageSwitchOnOffA(sceneObjHolder, this, this.syncSwitchOnA.bind(this), this.syncSwitchOffA.bind(this));

        if (useStageSwitchWriteB(sceneObjHolder, this, infoIter))
            listenStageSwitchOnOffB(sceneObjHolder, this, this.syncSwitchOnB.bind(this), this.syncSwitchOffB.bind(this));

        const speed = fallback(getJMapInfoArg0(infoIter), 12.0);
        const life = fallback(getJMapInfoArg1(infoIter), 530);
        const useStaticShadow = getJMapInfoBool(fallback(getJMapInfoArg2(infoIter), -1));
        for (let i = 0; i < 12; i++) {
            const ringBeam = new RingBeam(zoneAndLayer, sceneObjHolder, infoIter, this, true);
            ringBeam.setSpeed(speed);
            ringBeam.setLife(life);
            this.ringBeams.push(ringBeam);
        }
    }

    private attackCount: number = 0;
    protected updateSpine(sceneObjHolder: SceneObjHolder, currentNerve: BallBeamerNrv, deltaTimeFrames: number): void {
        if (currentNerve === BallBeamerNrv.Wait) {
            if (isFirstStep(this))
                startAction(this, 'Wait');

            if (isNearPlayer(sceneObjHolder, this, 3000.0))
                this.setupAttack(sceneObjHolder);
        } else if (currentNerve === BallBeamerNrv.AttackChargeWait) {
            // Original code charges on step 75, and fires on step 119, all mod 120, in the Attack state. We have
            // separate nerves for this.
            if (isGreaterEqualStep(this, 75)) {
                emitEffect(sceneObjHolder, this, 'Charge');
                this.setNerve(BallBeamerNrv.AttackCharging);
            }
        } else if (currentNerve === BallBeamerNrv.AttackCharging) {
            if (isGreaterEqualStep(this, (119 - 75))) {
                this.attackCount++;
                this.tryAttack(sceneObjHolder);
                startBck(this, 'Sign');
                if (this.attackCount === 3)
                    this.setNerve(BallBeamerNrv.Inter);
                else
                    this.setNerve(BallBeamerNrv.AttackChargeWait);
            }
        } else if (currentNerve === BallBeamerNrv.Inter) {
            if (isGreaterEqualStep(this, 120)) {
                if (this.switchOnA) {
                    this.attackCount = 0;
                    this.setNerve(BallBeamerNrv.AttackChargeWait);
                } else {
                    this.setNerve(BallBeamerNrv.Wait);
                }
            }
        }
    }

    private tryAttack(sceneObjHolder: SceneObjHolder): void {
        for (let i = 0; i < this.ringBeams.length; i++) {
            if (isDead(this.ringBeams[i])) {
                this.ringBeams[i].makeActorAppeared(sceneObjHolder);
                return;
            }
        }
    }

    private setupAttack(sceneObjHolder: SceneObjHolder): void {
        if (isValidSwitchA(this) && !isOnSwitchA(sceneObjHolder, this))
            return;

        const currentNerve = this.getCurrentNerve();
        if (currentNerve !== BallBeamerNrv.AttackChargeWait && currentNerve !== BallBeamerNrv.AttackCharging) {
            this.attackCount = 0;
            this.setNerve(BallBeamerNrv.AttackChargeWait);
        }
    }

    private syncSwitchOffA(sceneObjHolder: SceneObjHolder): void {
        this.switchOnA = false;
    }

    private syncSwitchOnA(sceneObjHolder: SceneObjHolder): void {
        this.switchOnA = true;
        this.setupAttack(sceneObjHolder);
    }

    private syncSwitchOffB(sceneObjHolder: SceneObjHolder): void {
    }

    private syncSwitchOnB(sceneObjHolder: SceneObjHolder): void {
        deleteEffect(sceneObjHolder, this, 'Charge');
        emitEffect(sceneObjHolder, this, 'Vanish');
        this.makeActorDead(sceneObjHolder);

        for (let i = 0; i < this.ringBeams.length; i++)
            this.ringBeams[i].makeActorDead(sceneObjHolder);
    }

    public static requestArchives(sceneObjHolder: SceneObjHolder, infoIter: JMapInfoIter): void {
        super.requestArchives(sceneObjHolder, infoIter);
        RingBeam.requestArchives(sceneObjHolder);
    }
}
