#![no_std]

use app_io::*;
use gstd::{
    msg,
    prelude::*,
    ActorId,
};
use hashbrown::HashMap;

#[cfg(feature = "binary-vendor")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));

static mut STATE: Option<HashMap<ActorId, u32>> = None;

fn state_mut() -> &'static mut HashMap<ActorId, u32> {
    let state = unsafe { STATE.as_mut() };

    debug_assert!(state.is_some(), "state isn't initialized");

    unsafe { state.unwrap_unchecked() }
}

#[no_mangle]
extern "C" fn init() {
    unsafe { STATE = Some(HashMap::new()) }
}

#[no_mangle]
extern "C" fn handle() {
    let payload = msg::load().expect("failed to load, decode, encode, or reply from `handle()`");

    if let PingPong::Ping = payload {
        let pingers = state_mut();

        pingers
            .entry(msg::source())
            .and_modify(|ping_count| *ping_count = ping_count.saturating_add(1))
            .or_insert(1);

        msg::reply(PingPong::Pong, 0).expect("failed to reply");
    }
}

#[no_mangle]
extern "C" fn state() {
    let state: Vec<(ActorId, u32)> = state_mut().iter().map(|(k, v)| (*k, *v)).collect();

    msg::reply(state, 0).expect("failed to encode or reply from `state()`");
}
