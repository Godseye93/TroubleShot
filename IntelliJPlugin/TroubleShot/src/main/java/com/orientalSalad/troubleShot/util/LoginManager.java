package com.orientalSalad.troubleShot.util;
import com.intellij.openapi.components.PersistentStateComponent;
import com.intellij.openapi.components.Service;
import com.intellij.openapi.components.State;
import com.intellij.openapi.components.Storage;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

@State(
        name = "com.example.LoginManager",
        storages = {@Storage("loginManager.xml")}
)
@Service
public final class LoginManager implements PersistentStateComponent<LoginManager.State> {
    private State myState = new State();

    public static class State {
        public Long loginUserSeq = null;
    }

    @Nullable
    @Override
    public State getState() {
        return myState;
    }

    @Override
    public void loadState(@NotNull State state) {
        myState = state;
    }

    public Long getLoginUserSeq() {
        return myState.loginUserSeq;
    }

    public void setLoginUserSeq(Long loginUserSeq) {
        myState.loginUserSeq = loginUserSeq;
    }
}
